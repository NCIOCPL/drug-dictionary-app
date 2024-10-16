import axios from 'axios';
import nock from 'nock';

import { buildAxiosRequest } from '../api/buildAxiosRequest';

describe('buildAxiosRequest', () => {
	const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
	const host = 'localhost';
	const port = '3000';
	const baseURL = `${protocol}://${host}:${port}/api`;
	let options = {
		headers: { 'content-type': 'application/json; charset=utf-8' },
		signal: {
			onabort: jest.fn(),
		},
	};

	const axiosInstance = axios.create({
		timeout: 10000,
		adapter: 'http',
	});

	beforeAll(() => {
		nock.disableNetConnect();
	});

	afterAll(() => {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	it('404 response for an invalid axios request', async () => {
		const endpoint = `/chicken/`;
		const init = `${baseURL}${endpoint}`;
		const scope = nock(baseURL).get(endpoint).reply(404);

		const actual = await buildAxiosRequest(axiosInstance)(init, options);
		const { status } = actual;
		expect(status).toBe(404);
		scope.done();
	});
});
