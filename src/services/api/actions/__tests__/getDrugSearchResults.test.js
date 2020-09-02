import { setAPIEndpoint } from '../../endpoints';
import { getDrugSearchResults } from '../index';

describe('getDrugSearchResults action', () => {
	setAPIEndpoint('/api/drugdictionary/v1/');

	test(`should match getDrugSearchResults action for drug "acetic acid"`, () => {
		const drug = 'acetic acid';
		const retAction = {
			method: 'GET',
			endpoint: `/api/drugdictionary/v1/Drugs/Search?query=${encodeURIComponent(drug)}&matchType=Begins`,
		};
		expect(getDrugSearchResults({ drug })).toEqual(retAction);
	});

});
