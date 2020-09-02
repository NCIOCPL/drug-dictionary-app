import { getDrugDefinition } from '../index';

describe('getDrugDefinition action', () => {
	test(`should match getDrugDefinition action for drug "bevacizumab"`, () => {
		const drug = 'bevacizumab';
		const retAction = {
			method: 'GET',
			endpoint: `/Drugs/GetByName?prettyUrlName=${encodeURIComponent(drug)}`,
		};
		expect(getDrugDefinition({ drug })).toEqual(retAction);
	});

});
