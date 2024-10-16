import { searchMatchType, DEFAULT_RESULT_SIZE } from '../../../constants';
import { getEndpoint } from '../endpoints';
const { beginsWith } = searchMatchType;

export const getDrugSearchResults = ({ drug, matchType = beginsWith }) => {
	const endpoint = getEndpoint('drugSearch');
	return {
		method: 'GET',
		endpoint: `${endpoint}?query=${encodeURIComponent(drug)}&matchType=${matchType}&size=${DEFAULT_RESULT_SIZE}`,
	};
};
