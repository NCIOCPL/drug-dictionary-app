import { getDrugSearchResults } from '../index';

describe('getDrugSearchResults action', () => {
	test(`should match getDrugSearchResults action for drug "bevacizumab"`, () => {
		const drug = 'acetic acid';
		const retAction = {
			method: 'GET',
			endpoint: `/Drugs/search?query=acetic%20acid&matchType=Begins`,
		};
		expect(getDrugSearchResults({ drug })).toEqual(retAction);
	});
});
