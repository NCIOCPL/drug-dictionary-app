import { getEndpoint } from '../endpoints';

export const getDrugDefinition = ({ idOrName }) => {
	const endpoint = getEndpoint('drugGetByIdOrName');
	return {
		method: 'GET',
		endpoint: `${endpoint}/${idOrName}`,
	};
};
