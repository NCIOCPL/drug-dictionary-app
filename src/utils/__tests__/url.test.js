import { getKeyValueFromQueryString } from '../url';

describe('getKeyValueFromQueryString', () => {
	it('should return value for key from query string if key exists in query string', () => {
		const queryString = '?dictionary=term&searchText=cancer&language=English&searchType=exact&offset=0&maxResults=0';
		expect(getKeyValueFromQueryString('searchText', queryString)).toBe('cancer');
	});

	it('should return null value if key does not exist in query string', () => {
		const queryString = '?dictionary=term&searchText=cancer&language=English&searchType=exact&offset=0&maxResults=0';
		expect(getKeyValueFromQueryString('chicken', queryString)).toBeNull();
	});
});
