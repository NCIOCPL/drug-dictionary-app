import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { useAutoSuggestResultsQuery } from '../autoSuggestQuery';

const UseAutoSuggestQuerySample = ({
	autoSuggestLimit = 10,
	searchText,
	shouldFetch,
	selectedOption,
}) => {
	const [autoSuggestState, setAutoSuggestState] = useState([]);

	const autoSuggest = useAutoSuggestResultsQuery({
		query: searchText,
		resultLimit: autoSuggestLimit,
		selectedOption,
		shouldFetch,
	});

	useEffect(() => {
		if (!autoSuggest.loading && autoSuggest.payload) {
			setAutoSuggestState(autoSuggest.payload);
		}
	}, [autoSuggest.loading, autoSuggest.payload]);

	return (
		<>
			{!autoSuggest.loading & (autoSuggestState.length > 0) && (
				<ul>
					{autoSuggest.payload.map((item, index) => {
						return <li key={index}>{item.termName}</li>;
					})}
				</ul>
			)}

			{!autoSuggest.loading & (autoSuggestState.length < 1) && (
				<div>No Results</div>
			)}

			{autoSuggest.loading && <div>Loading results...</div>}
		</>
	);
};

UseAutoSuggestQuerySample.propTypes = {
	autoSuggestLimit: PropTypes.number,
	searchText: PropTypes.string.isRequired,
	selectedOption: PropTypes.string.isRequired,
	shouldFetch: PropTypes.bool.isRequired,
};

export default UseAutoSuggestQuerySample;
