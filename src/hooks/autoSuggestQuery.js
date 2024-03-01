import { useEffect, useState } from 'react';

import { resourceType, searchMatchType } from '../constants';
import { useCustomQuery } from './index';
import { getAutoSuggestResults } from '../services/api/actions';

export const useAutoSuggestResultsQuery = ({ query, resultLimit, selectedOption, shouldFetch }) => {
	const { drugAlias, drugTerm } = resourceType;
	const { beginsWith, contains } = searchMatchType;
	const [autoSuggestStateResults, setAutoSuggestStateResults] = useState([]);
	const [isStateResponseSet, setIsStateResponseSet] = useState(false);
	const [matchType, setMatchType] = useState(selectedOption);
	const [searchText, setSearchText] = useState(query);

	const beginsWithDrugTerm = useCustomQuery(
		getAutoSuggestResults({
			autoSuggestLimit: resultLimit,
			searchText,
			matchType,
			resourceTypes: drugTerm,
		}),
		shouldFetch && matchType === beginsWith
	);
	const beginsWithAlias = useCustomQuery(
		getAutoSuggestResults({
			autoSuggestLimit: resultLimit,
			searchText,
			matchType,
			resourceTypes: drugAlias,
		}),
		shouldFetch && matchType === beginsWith
	);
	const beginsContainsWithAlias = useCustomQuery(
		getAutoSuggestResults({
			autoSuggestLimit: resultLimit,
			searchText,
			matchType: contains,
			resourceTypes: drugAlias,
		}),
		shouldFetch && matchType === beginsWith
	);
	const containsQueryWithDrugTerm = useCustomQuery(
		getAutoSuggestResults({
			autoSuggestLimit: resultLimit,
			searchText,
			matchType,
			resourceTypes: drugTerm,
		}),
		shouldFetch && matchType === contains
	);

	const containsQueryWithAlias = useCustomQuery(
		getAutoSuggestResults({
			autoSuggestLimit: resultLimit,
			searchText,
			matchType,
			resourceTypes: drugAlias,
		}),
		shouldFetch && matchType === contains
	);

	useEffect(() => {
		resetAutosuggestQueryParams();
	}, [query, selectedOption]);

	useEffect(() => {
		if (!beginsWithAlias.loading && beginsWithAlias.payload && !beginsWithDrugTerm.loading && beginsWithDrugTerm.payload && !beginsContainsWithAlias.loading && beginsContainsWithAlias.payload) {
			let retResponse = beginsWithDrugTerm.payload;

			// Set state result and early exit if response result count >= resultLimit
			if (retResponse >= resultLimit) {
				setAutoSuggestStateResults(returnUniqueArrayItems(retResponse));
				setIsStateResponseSet(true);
				return;
			}

			// Append results from response for term alias and set to state results
			// if sum of results from earlier response and term alias is >= resultLimit
			// Early exit
			if (retResponse.length + beginsWithAlias.payload.length >= resultLimit) {
				setAutoSuggestStateResults(returnUniqueArrayItems(retResponse.concat(beginsWithAlias.payload)).slice(0, resultLimit));
				setIsStateResponseSet(true);
				return;
			}

			// Finally append results from previous responses to result from contains request for term alias
			// Set to state results with trimmed result length based on resultLimit
			setAutoSuggestStateResults(returnUniqueArrayItems(retResponse.concat(beginsWithAlias.payload).concat(beginsContainsWithAlias.payload)).slice(0, resultLimit));
			setIsStateResponseSet(true);
		}
	}, [beginsWithAlias.loading, beginsWithAlias.payload, beginsWithDrugTerm.loading, beginsWithDrugTerm.payload, beginsContainsWithAlias.loading, beginsContainsWithAlias.payload]);

	useEffect(() => {
		if (!containsQueryWithAlias.loading && containsQueryWithAlias.payload && !containsQueryWithDrugTerm.loading && containsQueryWithDrugTerm.payload) {
			let retResponse = containsQueryWithDrugTerm.payload;

			// Set state result and early exit if response result count >= resultLimit
			if (retResponse >= resultLimit) {
				setAutoSuggestStateResults(returnUniqueArrayItems(retResponse).slice(0, resultLimit));
				setIsStateResponseSet(true);
				return;
			}

			// Finally append results from previous responses to result from contains request for term alias
			// Set to state results with trimmed result length based on resultLimit
			setAutoSuggestStateResults(returnUniqueArrayItems(retResponse.concat(containsQueryWithDrugTerm.payload).concat(containsQueryWithAlias.payload)).slice(0, resultLimit));
			setIsStateResponseSet(true);
		}
	}, [containsQueryWithAlias.loading, containsQueryWithAlias.payload, containsQueryWithDrugTerm.loading, containsQueryWithDrugTerm.payload]);

	const resetAutosuggestQueryParams = () => {
		setAutoSuggestStateResults([]);
		setIsStateResponseSet(false);
		setMatchType(selectedOption);
		setSearchText(query);
	};

	const returnUniqueArrayItems = (arrayObj) => {
		const retArray = [];
		const uniqueRefMap = new Map();

		for (const item of arrayObj) {
			const { termId, termName } = item;
			// Construct unique id from termId and termName
			// ( case insensitive )
			const mapId = `${termId}~${termName.toLowerCase()}`;
			// When unique id doesn't exist in ref map
			if (!uniqueRefMap.has(mapId)) {
				// Set unique id in ref map
				uniqueRefMap.set(mapId, true);
				// Add to return array
				retArray.push({
					termId,
					termName,
				});
			}
		}

		return retArray;
	};

	return isStateResponseSet ? { loading: false, payload: autoSuggestStateResults } : { loading: true };
};
