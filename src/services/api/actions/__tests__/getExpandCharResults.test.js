import { getExpandCharResults } from '../index';

describe('getExpandCharResults action', () => {
	test('should match return result for getExpandCharResults action', () => {
		const chr = 'A';
		const retAction = {
			method: 'GET',
			endpoint: `/Drugs/expand/${chr}?includeNameTypes=USBrandName&includeNameTypes=PreferredName&size=10000`,
		};
		expect(getExpandCharResults(chr)).toEqual(retAction);
	});
});
