import React, { useEffect, useState } from 'react';

import { resourceType, searchMatchType } from '../constants';
import { useCustomQuery } from './index';
import { getAutoSuggestResults } from '../services/api/actions';

export const useAutoSuggestResultsQuery = ({
	query,
	resultLimit,
	selectedOption,
	shouldFetch,
}) => {
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
	const containsQuery = useCustomQuery(
		getAutoSuggestResults({
			autoSuggestLimit: resultLimit,
			searchText,
			matchType,
			resourceTypes: null,
		}),
		shouldFetch && matchType === contains
	);

	useEffect(() => {
		resetAutosuggestQueryParams();
	}, [query, selectedOption]);

	useEffect(() => {
		if (
			!beginsWithAlias.loading &&
			beginsWithAlias.payload &&
			!beginsWithDrugTerm.loading &&
			beginsWithDrugTerm.payload &&
			!beginsContainsWithAlias.loading &&
			beginsContainsWithAlias.payload
		) {
			let retResponse = beginsWithDrugTerm.payload;

			// Set state result and early exit if response result count >= resultLimit
			if (retResponse >= resultLimit) {
				setAutoSuggestStateResults(retResponse.slice(0, resultLimit));
				setIsStateResponseSet(true);
				return;
			}

			// Append results from response for term alias and set to state results
			// if sum of results from earlier response and term alias is >= resultLimit
			// Early exit
			if (retResponse.length + beginsWithAlias.payload.length >= resultLimit) {
				setAutoSuggestStateResults(
					retResponse.concat(beginsWithAlias.payload).slice(0, resultLimit)
				);
				setIsStateResponseSet(true);
				return;
			}

			// Finally append results from previous responses to result from contains request for term alias
			// Set to state results with trimmed result length based on resultLimit
			setAutoSuggestStateResults(
				retResponse
					.concat(beginsWithAlias.payload)
					.concat(beginsContainsWithAlias.payload)
					.slice(0, resultLimit)
			);
			setIsStateResponseSet(true);
		}
	}, [
		beginsWithAlias.loading,
		beginsWithAlias.payload,
		beginsWithDrugTerm.loading,
		beginsWithDrugTerm.payload,
		beginsContainsWithAlias.loading,
		beginsContainsWithAlias.payload,
	]);

	useEffect(() => {
		if (!containsQuery.loading && containsQuery.payload) {
			const retResponse = containsQuery.payload;
			setAutoSuggestStateResults(retResponse.slice(0, resultLimit));
			setIsStateResponseSet(true);
		}
	}, [containsQuery.loading, containsQuery.payload]);

	const resetAutosuggestQueryParams = () => {
		setAutoSuggestStateResults([]);
		setIsStateResponseSet(false);
		setMatchType(selectedOption);
		setSearchText(query);
	};

	return isStateResponseSet
		? { loading: false, payload: autoSuggestStateResults }
		: { loading: true };
};
