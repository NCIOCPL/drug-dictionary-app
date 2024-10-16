import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import PropTypes from 'prop-types';
import { ClientContextProvider } from 'react-fetching-library';
import { MemoryRouter, useLocation } from 'react-router-dom';

import autoSuggestionsEnglish from './autoSuggestions';
import { searchMatchType } from '../../../../constants';
import Search from '../Search';
import { useStateValue } from '../../../../store/store';

import { MockAnalyticsProvider } from '../../../../tracking';
const analyticsHandler = jest.fn(() => {});

jest.mock('../../../../store/store.jsx');
let client;
const { beginsWith, contains } = searchMatchType;
const dictionaryName = 'Cancer.gov';
const dictionaryTitle = 'NCI Dictionary of Cancer Terms';

describe('<Search /> English', () => {
	let location;
	const language = 'en';

	function SearchWithLocation({ RenderComponent }) {
		location = useLocation();
		return <RenderComponent />;
	}

	SearchWithLocation.propTypes = {
		RenderComponent: PropTypes.elementType,
	};

	beforeEach(() => {
		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath: '/',
				dictionaryName,
				dictionaryTitle,
				language,
			},
		]);

		client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: autoSuggestionsEnglish,
			}),
		};
	});

	const renderComponent = () => {
		render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<MemoryRouter initialEntries={['/']}>
					<ClientContextProvider client={client}>
						<SearchWithLocation RenderComponent={Search} />
					</ClientContextProvider>
				</MemoryRouter>
			</MockAnalyticsProvider>
		);
	};

	it('Search component renders', async () => {
		renderComponent();
		await waitFor(() => {
			expect(screen.getByTestId('tid-search-container')).toBeInTheDocument();
		});
	});

	it('Check both Starts with and Contains radio buttons are present', async () => {
		renderComponent();
		await waitFor(() => {
			expect(screen.getByDisplayValue(searchMatchType.beginsWith)).toBeInTheDocument();
		});
		expect(screen.getByDisplayValue(searchMatchType.contains)).toBeInTheDocument();
	});

	it('Starts with radio is checked by default', async () => {
		renderComponent();
		await waitFor(() => {
			const startsWithRadio = screen.getByDisplayValue(searchMatchType.beginsWith);
			expect(startsWithRadio).toBeChecked();
		});
	});

	it('Ensure correct location is set on router when Search button is clicked without search box text input', async () => {
		renderComponent();
		const expectedLocationObject = {
			pathname: '/search/',
			search: '',
			hash: '',
			state: null,
			key: expect.any(String),
		};
		const searchButton = screen.getByText('Search');
		fireEvent.click(searchButton);
		await waitFor(() => {
			expect(location).toMatchObject(expectedLocationObject);
		});
	});

	it('Ensure location is set on router when Search button is clicked with text input', async () => {
		renderComponent();
		const searchText = 'meta';
		const expectedLocationObject = {
			pathname: `/search/${searchText}/`,
			search: `?searchMode=${beginsWith}`,
			hash: '',
			state: null,
			key: expect.any(String),
		};
		const textInput = screen.getByPlaceholderText('Enter keywords or phrases');
		const searchButton = screen.getByText('Search');
		fireEvent.change(textInput, { target: { value: searchText } });
		fireEvent.click(searchButton);
		await waitFor(() => {
			expect(location).toMatchObject(expectedLocationObject);
		});
	});

	it('Ensure location is set on router when Search button is clicked with "Contains" radio button checked and text input entered', async () => {
		renderComponent();
		const searchText = 'cancer';
		const expectedLocationObject = {
			pathname: `/search/${searchText}/`,
			search: `?searchMode=${contains}`,
			hash: '',
			state: null,
			key: expect.any(String),
		};
		const containsRadio = screen.getByDisplayValue(searchMatchType.contains);
		fireEvent.click(containsRadio);
		const textInput = screen.getByPlaceholderText('Enter keywords or phrases');
		fireEvent.change(textInput, { target: { value: searchText } });
		const searchButton = screen.getByText('Search');
		fireEvent.click(searchButton);
		await waitFor(() => {
			expect(location).toMatchObject(expectedLocationObject);
		});
	});

	it('Submitting search triggers provided analytics event', async () => {
		renderComponent();
		const searchText = 'metastatic';
		const textInput = screen.getByPlaceholderText('Enter keywords or phrases');
		fireEvent.change(textInput, { target: { value: searchText } });
		const searchButton = screen.getByText('Search');
		fireEvent.click(searchButton);
		await waitFor(() => {
			expect(analyticsHandler).toHaveBeenCalled();
		});
	});

	it('Selecting term from autosuggest triggers provided analytics event', async () => {
		renderComponent();
		const searchText = 'metastatic';
		const textInput = screen.getByPlaceholderText('Enter keywords or phrases');
		fireEvent.change(textInput, { target: { value: searchText } });
		await waitFor(() => {
			expect(screen.getByRole('combobox')).toBeInTheDocument();
		});
		fireEvent.keyDown(textInput, { key: 'ArrowDown', code: 'ArrowDown' });
		fireEvent.keyDown(textInput, { key: 'Enter', code: 'Enter' });
		await waitFor(() => {
			expect(analyticsHandler).toHaveBeenCalled();
		});
	});

	describe('Autocomplete', () => {
		it('should take search input, select highlighted option, execute search, and confirm expected location', async () => {
			const searchText = 'met';

			client = {
				query: async () => ({
					error: false,
					status: 200,
					payload: autoSuggestionsEnglish,
				}),
			};

			renderComponent();

			const input = screen.getByRole('combobox');
			fireEvent.focus(input);
			fireEvent.change(input, { target: { value: 'ap' } });

			await waitFor(() => {
				expect(screen.getByTestId('tid-auto-suggest-options')).toHaveTextContent('Please enter 3 or more characters');
			});

			fireEvent.change(input, { target: { value: searchText } });
			fireEvent.focus(input);

			await waitFor(() => {
				const menuOptions = screen.getAllByRole('option');
				expect(menuOptions).toHaveLength(10);
			});

			fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

			const searchButton = screen.getByText('Search');
			fireEvent.click(searchButton);

			const expectedLocationObject = {
				pathname: `/search/met/`,
				search: `?searchMode=${beginsWith}`,
				hash: '',
				state: null,
				key: expect.any(String),
			};
			await waitFor(() => {
				expect(location).toMatchObject(expectedLocationObject);
			});
		});
	});
});
