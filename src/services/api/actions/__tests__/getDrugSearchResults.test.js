import { getDrugSearchResults } from '../index';

describe('getDrugSearchResults action', () => {
	test(`should match getDrugSearchResults action for drug begins "acetic acid"`, () => {
		const drug = 'acetic acid';
		const retAction = {
			method: 'GET',
			endpoint: `/Drugs/search?query=acetic%20acid&matchType=Begins&size=10000`,
		};
		expect(getDrugSearchResults({ drug, matchType: 'Begins' })).toEqual(
			retAction
		);
	});

	test(`should match getDrugSearchResults action for drug Contains "acetic acid"`, () => {
		const drug = 'acetic acid';
		const retAction = {
			method: 'GET',
			endpoint: `/Drugs/search?query=acetic%20acid&matchType=Contains&size=10000`,
		};
		expect(getDrugSearchResults({ drug, matchType: 'Contains' })).toEqual(
			retAction
		);
	});
});
