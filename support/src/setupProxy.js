/// <reference path="../../node_modules/@types/express/index.d.ts"/>

const fs = require('fs');
const path = require('path');
const util = require('util');

/**
 * Async wrapper for readFile
 */
const readFileAsync = util.promisify(fs.readFile);

/**
 * Async wrapper for readDir
 */
const readDirAsync = util.promisify(fs.readdir);

/**
 * Async wrapper for access
 */
const accessAsync = util.promisify(fs.access);

/**
 * getDrugByIdOrName - Middleware for getting drug search results
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getDrugByIdOrName = async (req, res, next) => {
	const { idOrName } = req.params;

	// IMPLEMENTOR NOTE: Always good to integration test 500 errors with your app
	if (idOrName === 'server-error') {
		res.status(500).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 404 errors with your app
	if (idOrName === 'not-found') {
		res.status(404).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 400 errors with your app
	if (idOrName === 'bad-request') {
		res.status(400).end();
	}

	// IMPLEMENTOR NOTE: The mock data should match the API's folder structure.
	const mockDir = path.join(
		__dirname,
		'..',
		'mock-data',
		'drugdictionary',
		'v1',
		'Drugs',
	);

	try {
		// IMPLEMENTOR NOTE: The mock data file name should be the end part of the path
		// if it is dynamic and any other idOrName params to make it distinct.
		// This example is basic...
		const mockFile = path.join(mockDir, `${idOrName}.json`);

		try {
			// Test if it exists.
			await accessAsync(mockFile);
			res.sendFile(mockFile);
		} catch (err) {
			// Access denied to open file, or not found.
			// treat at 404, or your choice.
			console.error(err);
			res.status(404).end();
		}
	} catch (err) {
		// This must be an error from sending the file, or joining
		// the path.
		console.error(err);
		res.status(500).end();
	}
};

/**
 * getDrugSearch - Middleware for getting drug search results
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getDrugSearch = async (req, res, next) => {
	const { query, matchType } = req.query;

	// IMPLEMENTOR NOTE: You are mocking the API, so if the API returns an object
	// when something is not found like search results, you need to handle that.
	// This is custom code and is not something easily mocked up.

	// IMPLEMENTOR NOTE: Always good to integration test 500 errors with your app
	if (query === 'server-error') {
		res.status(500).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 404 errors with your app
	if (query === 'not-found') {
		res.status(404).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 400 errors with your app
	if (query === 'bad-request') {
		res.status(400).end();
	}

	// IMPLEMENTOR NOTE: The mock data should match the API's folder structure.
	const mockDir = path.join(
		__dirname,
		'..',
		'mock-data',
		'drugdictionary',
		'v1',
		'Drugs',
		'search',
		matchType
	);

	try {
		// IMPLEMENTOR NOTE: The mock data file name should be the end part of the path
		// if it is dynamic and any other query params to make it distinct.
		// This example is basic...
		const mockFile = path.join(mockDir, `${query}.json`);

		try {
			// Test if it exists.
			await accessAsync(mockFile);
			res.sendFile(mockFile);
		} catch (err) {
			// Access denied to open file, or not found.
			// treat at 404, or your choice.
			console.error(err);
			res.status(404).end();
		}
	} catch (err) {
		// This must be an error from sending the file, or joining
		// the path.
		console.error(err);
		res.status(500).end();
	}
};

const getAutoSuggestResults = async (req, res, next) => {
	const { searchText, matchType } = req.query;

	// IMPLEMENTOR NOTE: You are mocking the API, so if the API returns an object
	// when something is not found like search results, you need to handle that.
	// This is custom code and is not something easily mocked up.

	// IMPLEMENTOR NOTE: Always good to integration test 500 errors with your app
	if (searchText === 'server-error') {
		res.status(500).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 404 errors with your app
	if (searchText === 'not-found') {
		res.status(404).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 400 errors with your app
	if (searchText === 'bad-request') {
		res.status(400).end();
	}

	// IMPLEMENTOR NOTE: The mock data should match the API's folder structure.
	const mockDir = path.join(
		__dirname,
		'..',
		'mock-data',
		'drugdictionary',
		'v1',
		'Autosuggest',
		matchType,
	);
	try {
		// IMPLEMENTOR NOTE: The mock data file name should be the end part of the path
		// if it is dynamic and any other query params to make it distinct.
		// This example is basic...
		const mockFile = path.join(mockDir, `${encodeURIComponent(searchText)}.json`);

		try {
			// Test if it exists.
			await accessAsync(mockFile);
			res.sendFile(mockFile);
		} catch (err) {
			// Access denied to open file, or not found.
			// treat at 404, or your choice.
			console.error(err);
			res.status(404).end();
		}
	} catch (err) {
		// This must be an error from sending the file, or joining
		// the path.
		console.error(err);
		res.status(500).end();
	}
};


/**
 * Middleware setup for "setupProxy"
 * @param {Express.Application} app
 */
const middleware = (app) => {
	app.use('/api/drugdictionary/v1/Autosuggest', getAutoSuggestResults);

	app.use('/api/drugdictionary/v1/Drugs/search', getDrugSearch);
	app.use('/api/drugdictionary/v1/Drugs/:idOrName', getDrugByIdOrName);

	app.use('/api/*', (req, res, next) => {
		console.error('Api path not implemented');
		res.status(404).end();
	});
};

module.exports = middleware;
