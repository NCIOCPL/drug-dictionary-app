import { getDrugDefinition } from '../index';

describe('getDrugDefinition action', () => {
	test(`should match getDrugDefinition action for drug "bevacizumab"`, () => {
		const idOrName = 'bevacizumab';
		const retAction = {
			method: 'GET',
			endpoint: `/Drugs/${idOrName}`,
		};
		expect(getDrugDefinition({ idOrName })).toEqual(retAction);
	});
});
