// Add any constants here

// Array for AZ list
export const AZListArray = 'abcdefghijklmnopqrstuvwxyz#'.split('');

// Default global results size returned from api set to an exceedingly
// high number that exceeds existing terms of over 8,000 as results
// paging are not going to be implemented for now ( 10,000 )
export const DEFAULT_RESULT_SIZE = 10000;

export const resourceType = {
	drugAlias: 'DrugAlias',
	drugTerm: 'DrugTerm'
};

export const searchMatchType = {
	beginsWith: 'Begins',
	contains: 'Contains',
};

export const searchMatchTypeAnalyticsMap = {
	[searchMatchType.beginsWith]: 'starts with',
	[searchMatchType.contains]: 'contains',
};
