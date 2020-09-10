import { searchMatchType } from '../../../constants';
import { getEndpoint } from '../endpoints';

const { beginsWith } = searchMatchType;

export const getDrugSearchResults = ({ drug, searchType = beginsWith }) => {
	const endpoint = getEndpoint('drugSearch');
	return {
		method: 'GET',
		endpoint: `${endpoint}?query=${encodeURIComponent(
			drug
		)}&matchType=${searchType}`,
	};
};
