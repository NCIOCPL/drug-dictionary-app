import { getEndpoint } from '../endpoints';

export const getDrugDefinition = ({ drug }) => {
	const endpoint = getEndpoint('drugGetByName');
	return {
		method: 'GET',
		endpoint: `${endpoint}?prettyUrlName=${drug}`,
    };
};
