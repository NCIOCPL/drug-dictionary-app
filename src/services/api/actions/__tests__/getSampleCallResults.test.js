import { getSampleCallResults } from '../index';

describe('getSampleCallResults action', () => {
	test(`should match getSampleCallResults action for id "6789"`, () => {
		const id = '6789';
		const retAction = {
			method: 'GET',
			endpoint: `/sampleendpoint/${id}`,
		};
		expect(getSampleCallResults({ id })).toEqual(retAction);
	});

});
