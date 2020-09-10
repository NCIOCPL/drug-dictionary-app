import { getDrugSearchResults } from '../index';

describe('getDrugSearchResults action', () => {
	test(`should match getDrugSearchResults action for drug "acetic acid"`, () => {
		const drug = 'acetic acid';
		const retAction = {
			method: 'GET',
			endpoint: `/Drugs/Search?query=${encodeURIComponent(drug)}&matchType=Begins`,
		};
		expect(getDrugSearchResults({ drug })).toEqual(retAction);
	});

});
