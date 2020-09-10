import { searchMatchType } from '../../../constants';
import { getEndpoint } from '../endpoints';

const { beginsWith, contains } = searchMatchType;

export const getAutoSuggestResults = (
	searchText,
	matchType = beginsWith,
	autoSuggestLimit = 10
) => {
	const endpoint = getEndpoint('autoSuggest');
	const resourceTypeQuery =
		matchType === contains ? `&includeResourceTypes=DrugTerm` : '';
	return {
		method: 'GET',
		endpoint: `${endpoint}?searchText=${encodeURIComponent(searchText)}&matchType=${matchType}${resourceTypeQuery}&size=${autoSuggestLimit}`,
	};
};
