import { resourceType, searchMatchType } from '../../../constants';
import { getEndpoint } from '../endpoints';

const { drugTerm } = resourceType;
const { beginsWith } = searchMatchType;

export const getAutoSuggestResults = ({ autoSuggestLimit = 10, searchText, matchType = beginsWith, resourceTypes = drugTerm }) => {
	const endpoint = getEndpoint('autoSuggest');
	const resourceTypeQuery = resourceTypes ? `&includeResourceTypes=${resourceTypes}` : '';
	return {
		method: 'GET',
		endpoint: `${endpoint}?searchText=${encodeURIComponent(searchText)}&matchType=${matchType}${resourceTypeQuery}&size=${autoSuggestLimit}`,
	};
};
