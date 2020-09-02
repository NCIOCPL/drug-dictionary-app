import { getEndpoint } from '../endpoints';

export const getDrugSearchResults = ({ drug, searchType = 'Begins' }) => {
	const endpoint = getEndpoint('drugSearch');
	return {
		method: 'GET',
		endpoint: `${endpoint}?query=${encodeURIComponent(
			drug
		)}&matchType=${searchType}`,
	};
};
