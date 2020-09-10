// Add any constants here

// Array for AZ list
export const AZListArray = 'abcdefghijklmnopqrstuvwxyz#'.split('');


export const searchMatchType = {
	beginsWith: 'Begins',
	contains: 'Contains',
};

export const searchMatchTypeAnalyticsMap = {
	[searchMatchType.beginsWith]: 'starts with',
	[searchMatchType.contains]: 'contains',
};
