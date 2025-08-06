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
		return res.status(500).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 404 errors with your app
	if (idOrName === 'not-found') {
		return res.status(404).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 400 errors with your app
	if (idOrName === 'bad-request') {
		return res.status(400).end();
	}

	// IMPLEMENTOR NOTE: The mock data should match the API's folder structure.
	const mockDir = path.join(__dirname, '..', 'mock-data', 'drugdictionary', 'v1', 'Drugs');

	try {
		// IMPLEMENTOR NOTE: The mock data file name should be the end part of the path
		// if it is dynamic and any other idOrName params to make it distinct.
		// This example is basic...
		const mockFile = path.join(mockDir, `${idOrName}.json`);

		try {
			// Test if it exists.
			await accessAsync(mockFile);
			if (!res.headersSent) {
				res.sendFile(mockFile);
			}
		} catch (err) {
			// Access denied to open file, or not found.
			// treat at 404, or your choice.
			console.error(err);
			if (!res.headersSent) {
				res.status(404).end();
			}
		}
	} catch (err) {
		// This must be an error from sending the file, or joining
		// the path.
		console.error(err);
		if (!res.headersSent) {
			res.status(500).end();
		}
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
		return res.status(500).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 404 errors with your app
	if (query === 'not-found') {
		return res.status(404).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 400 errors with your app
	if (query === 'bad-request') {
		return res.status(400).end();
	}

	// IMPLEMENTOR NOTE: The mock data should match the API's folder structure.
	const mockDir = path.join(__dirname, '..', 'mock-data', 'drugdictionary', 'v1', 'Drugs', 'search', matchType);

	try {
		// IMPLEMENTOR NOTE: The mock data file name should be the end part of the path
		// if it is dynamic and any other query params to make it distinct.
		// This example is basic...
		const mockFile = path.join(mockDir, `${encodeURIComponent(query)}.json`);

		try {
			// Test if it exists.
			await accessAsync(mockFile);
			if (!res.headersSent) {
				res.sendFile(mockFile);
			}
		} catch (err) {
			// Access denied to open file, or not found.
			// treat at 404, or your choice.
			console.error(err);
			if (!res.headersSent) {
				res.status(404).end();
			}
		}
	} catch (err) {
		// This must be an error from sending the file, or joining
		// the path.
		console.error(err);
		if (!res.headersSent) {
			res.status(500).end();
		}
	}
};

const getAutoSuggestResults = async (req, res, next) => {
	const { includeResourceTypes, matchType, searchText } = req.query;

	// IMPLEMENTOR NOTE: You are mocking the API, so if the API returns an object
	// when something is not found like search results, you need to handle that.
	// This is custom code and is not something easily mocked up.

	// IMPLEMENTOR NOTE: Always good to integration test 500 errors with your app
	if (searchText === 'server-error') {
		return res.status(500).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 404 errors with your app
	if (searchText === 'not-found') {
		return res.status(404).end();
	}

	// IMPLEMENTOR NOTE: Always good to integration test 400 errors with your app
	if (searchText === 'bad-request') {
		return res.status(400).end();
	}

	// IMPLEMENTOR NOTE: The mock data should match the API's folder structure.
	const mockDir = path.join(__dirname, '..', 'mock-data', 'drugdictionary', 'v1', 'Autosuggest', matchType, includeResourceTypes || '');
	try {
		// IMPLEMENTOR NOTE: The mock data file name should be the end part of the path
		// if it is dynamic and any other query params to make it distinct.
		// This example is basic...
		const mockFile = path.join(mockDir, `${encodeURIComponent(searchText.toLowerCase())}.json`);

		try {
			// Test if it exists.
			await accessAsync(mockFile);
			if (!res.headersSent) {
				res.sendFile(mockFile);
			}
		} catch (err) {
			// Access denied to open file, or not found.
			// treat at 404, or your choice.
			console.error(err);
			if (!res.headersSent) {
				res.status(404).end();
			}
		}
	} catch (err) {
		// This must be an error from sending the file, or joining
		// the path.
		console.error(err);
		if (!res.headersSent) {
			res.status(500).end();
		}
	}
};

/**
 * getDrugsByExpandChar - Middleware for getting drugs by character
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getDrugsByExpandChar = async (req, res, next) => {
	const { expandChar } = req.params;
	const expandLetter = expandChar.toUpperCase();
	// IMPLEMENTOR NOTE: Always good to integration test 500 errors with your app
	if (expandLetter === 'server-error') {
		return res.status(500).end();
	}
	// IMPLEMENTOR NOTE: Always good to integration test 404 errors with your app
	if (expandLetter === 'not-found') {
		return res.status(404).end();
	}
	// IMPLEMENTOR NOTE: Always good to integration test 400 errors with your app
	if (expandLetter === 'bad-request') {
		return res.status(400).end();
	}
	// IMPLEMENTOR NOTE: The mock data should match the API's folder structure.
	const mockDir = path.join(__dirname, '..', 'mock-data', 'drugdictionary', 'v1', 'Drugs', 'expand');
	try {
		const mockFile = path.join(mockDir, `${expandLetter}.json`);
		try {
			// Test if it exists.
			await accessAsync(mockFile);
			if (!res.headersSent) {
				res.sendFile(mockFile);
			}
		} catch (err) {
			// Return empty response for not found, and log to console should access be denied
			console.error(err);
			if (!res.headersSent) {
				const payload = {
					meta: {
						totalResults: 0,
						from: 0,
					},
					results: [],
					links: null,
				};
				console.log('Sending empty response:', payload);
				res.send(payload);
			}
		}
	} catch (err) {
		// This must be an error from sending the file, or joining
		// the path.
		console.error(err);
		if (!res.headersSent) {
			res.status(500).end();
		}
	}
};

/**
 * Request deduplication middleware to prevent "Can't set headers after they are sent" errors
 * This addresses race conditions when Pa11y makes rapid requests
 */
const requestDeduplication = () => {
	const pendingRequests = new Map();

	return (req, res, next) => {
		const key = `${req.method}:${req.url}`;

		// If this request is already being processed, wait for it
		if (pendingRequests.has(key)) {
			const existingRequest = pendingRequests.get(key);
			existingRequest
				.then(() => {
					// The original request has completed, skip this duplicate
					if (!res.headersSent) {
						res.status(204).end(); // No content for duplicate request
					}
				})
				.catch(() => {
					if (!res.headersSent) {
						res.status(500).end();
					}
				});
			return;
		}

		// Mark this request as pending
		const requestPromise = new Promise((resolve, reject) => {
			const originalEnd = res.end;
			const originalSend = res.send;
			const originalSendFile = res.sendFile;

			// Override response methods to resolve the promise when done
			res.end = function (...args) {
				pendingRequests.delete(key);
				resolve();
				return originalEnd.apply(this, args);
			};

			res.send = function (...args) {
				pendingRequests.delete(key);
				resolve();
				return originalSend.apply(this, args);
			};

			res.sendFile = function (...args) {
				const callback = args[args.length - 1];
				if (typeof callback === 'function') {
					args[args.length - 1] = function (err) {
						pendingRequests.delete(key);
						resolve();
						callback(err);
					};
				} else {
					args.push(function (err) {
						pendingRequests.delete(key);
						resolve();
					});
				}
				return originalSendFile.apply(this, args);
			};

			// Handle errors
			res.on('error', () => {
				pendingRequests.delete(key);
				reject();
			});
		});

		pendingRequests.set(key, requestPromise);
		next();
	};
};

/**
 * Middleware setup for "setupProxy"
 * @param {Express.Application} app
 */
const middleware = (app) => {
	// Add request deduplication for Pa11y testing to prevent "Can't set headers" errors
	if (process.env.NODE_ENV === 'test' || process.env.CI) {
		console.log('🧪 Test mode detected - applying request deduplication');
		app.use(requestDeduplication());

		// Add custom static file serving for Pa11y testing since we disabled webpack-dev-server's static middleware
		const express = require('express');
		const publicPath = path.join(__dirname, '..', '..', 'public');
		app.use(
			express.static(publicPath, {
				// Prevent caching issues during testing
				etag: false,
				lastModified: false,
				maxAge: 0,
			})
		);
	}

	app.use('/api/drugdictionary/v1/Autosuggest', getAutoSuggestResults);
	app.use('/api/drugdictionary/v1/Drugs/search', getDrugSearch);
	app.use('/api/drugdictionary/v1/Drugs/expand/:expandChar', getDrugsByExpandChar);
	// Should be last route on /Drugs
	app.use('/api/drugdictionary/v1/Drugs/:idOrName', getDrugByIdOrName);

	app.use('/api/*', (req, res, next) => {
		console.error('Api path not implemented');
		if (!res.headersSent) {
			res.status(404).end();
		}
	});
};

module.exports = middleware;
