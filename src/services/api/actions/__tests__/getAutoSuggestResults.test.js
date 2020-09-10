import { searchMatchType } from '../../../../constants';
import { getAutoSuggestResults } from '../index';

const { beginsWith, contains } = searchMatchType;

describe('getAutoSuggestResults action', () => {
	test(`should match getAutoSuggestResults action with Begins for searchText "ace"`, () => {
		const searchText = 'ace';
		const retAction = {
			method: 'GET',
			endpoint: `/Autosuggest?searchText=${encodeURIComponent(searchText)}&matchType=Begins&size=10`,
		};
		expect(getAutoSuggestResults(searchText, beginsWith)).toEqual(retAction);
	});

	test(`should match getAutoSuggestResults action with Contains for searchText "ace"`, () => {
		const searchText = 'ace';
		const retAction = {
			method: 'GET',
			endpoint: `/Autosuggest?searchText=${encodeURIComponent(searchText)}&matchType=Contains&includeResourceTypes=DrugTerm&size=10`,
		};
		expect(getAutoSuggestResults(searchText, contains)).toEqual(retAction);
	});

});
