import { getEndpoint } from '../endpoints';

export const getDrugByPrettyURLName = (prettyURLName) => {
	const endpoint = getEndpoint('prettyURL');
	return {
		method: 'GET',
		endpoint: `${endpoint}?prettyUrlName=${encodeURIComponent(prettyURLName)}`,
	};
};
