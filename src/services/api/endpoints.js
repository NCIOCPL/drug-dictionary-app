/**
 * Sets and returns defined API endpoint URL based on service name passed in
 *
 * @param {string} serviceName - Given name of defined API service endpoint
 * @return {string} endpoint - Endpoint URL
 */
export const getEndpoint = (serviceName) => {
	// Define api endpoints here
	const endpoints = {
		autoSuggest: `/Autosuggest`,
		drugGetByIdOrName: `/Drugs`,
		drugSearch: `/Drugs/search`,
		expandChar: '/Drugs/expand',
	};
	return endpoints[serviceName];
};
