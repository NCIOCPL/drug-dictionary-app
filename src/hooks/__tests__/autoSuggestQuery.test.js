import { act, getByText, render, screen } from '@testing-library/react';
import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';

import UseAutoSuggestQuerySample from '../samples/UseAutoSuggestQuerySample';

describe('autoSuggestQuery hook', () => {
	test('should display "No Results" text when payload is empty', async () => {
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: [],
			}),
		};

		const params = {
			searchText: 'bev',
			selectedOption: 'Begins',
			shouldFetch: true,
		};

		await act(async () => {
			render(
				<ClientContextProvider client={client}>
					<UseAutoSuggestQuerySample {...params} />
				</ClientContextProvider>
			);
		});

		expect(screen.getByText('No Results')).toBeInTheDocument();
	});

	test('should return 2 items that match payload provided', async () => {
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: [
					{
						termId: 43234,
						termName: 'bevacizumab',
					},
					{
						termId: 729590,
						termName: 'bevacizumab-IRDye 800CW',
					},
				],
			}),
		};

		const params = {
			searchText: 'bev',
			selectedOption: 'Begins',
			shouldFetch: true,
		};

		await act(async () => {
			render(
				<ClientContextProvider client={client}>
					<UseAutoSuggestQuerySample {...params} />
				</ClientContextProvider>
			);
		});

		const resultsList = screen.getAllByRole('listitem');
		expect(resultsList.length).toEqual(2);
		expect(getByText(resultsList[0], 'bevacizumab')).toBeInTheDocument();
		expect(getByText(resultsList[1], 'bevacizumab-IRDye 800CW')).toBeInTheDocument();
	});

	test('should return default 10 items that match payload when more than 10 items are provided', async () => {
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: [
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar BAT1706',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar BEVZ92',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar BI 695502',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar CBT 124',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar CT-P16',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar FKB238',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar GB-222',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar HD204',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar HLX04',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar IBI305',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar LY01008',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar MB02',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar MIL60',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar PF-06439535',
					},
					{
						termId: 43234,
						termName: 'bevacizumab biosimilar QL 1101',
					},
				],
			}),
		};

		const params = {
			searchText: 'beva',
			selectedOption: 'Begins',
			shouldFetch: true,
		};

		await act(async () => {
			render(
				<ClientContextProvider client={client}>
					<UseAutoSuggestQuerySample {...params} />
				</ClientContextProvider>
			);
		});

		const resultsList = screen.getAllByRole('listitem');
		expect(resultsList.length).toEqual(10);
		expect(getByText(resultsList[0], 'bevacizumab biosimilar BAT1706')).toBeInTheDocument();
		expect(getByText(resultsList[1], 'bevacizumab biosimilar BEVZ92')).toBeInTheDocument();
		expect(getByText(resultsList[2], 'bevacizumab biosimilar BI 695502')).toBeInTheDocument();
		expect(getByText(resultsList[3], 'bevacizumab biosimilar CBT 124')).toBeInTheDocument();
		expect(getByText(resultsList[4], 'bevacizumab biosimilar CT-P16')).toBeInTheDocument();
		expect(getByText(resultsList[5], 'bevacizumab biosimilar FKB238')).toBeInTheDocument();
		expect(getByText(resultsList[6], 'bevacizumab biosimilar GB-222')).toBeInTheDocument();
		expect(getByText(resultsList[7], 'bevacizumab biosimilar HD204')).toBeInTheDocument();
		expect(getByText(resultsList[8], 'bevacizumab biosimilar HLX04')).toBeInTheDocument();
		expect(getByText(resultsList[9], 'bevacizumab biosimilar IBI305')).toBeInTheDocument();
	});

	test('should return 12 items given autoSuggestLimit of 12 that match payload', async () => {
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: [
					{
						termId: 552704,
						termName: 'abiraterone acetate',
					},
					{
						termId: 766482,
						termName: 'Annonaceous acetogenins',
					},
					{
						termId: 762469,
						termName: 'carbon C 13 acetate',
					},
					{
						termId: 646836,
						termName: 'carbon C 14 eribulin acetate',
					},
					{
						termId: 362071,
						termName: 'carbon-11 acetate',
					},
					{
						termId: 38182,
						termName: 'caspofungin acetate',
					},
					{
						termId: 385686,
						termName: 'corticorelin acetate',
					},
					{
						termId: 39203,
						termName: 'cyproterone acetate',
					},
					{
						termId: 357620,
						termName: 'deslorelin acetate',
					},
					{
						termId: 734496,
						termName: 'desmopressin acetate',
					},
					{
						termId: 561774,
						termName: 'diphtheria toxoid/tetanus toxoid/acellular pertussis adsorbed, recombinant hepatitis B/inactivated poliovirus vaccine combined',
					},
					{
						termId: 561776,
						termName: 'diphtheria toxoid/tetanus toxoid/acellular pertussis vaccine adsorbed',
					},
				],
			}),
		};

		const params = {
			autoSuggestLimit: 12,
			searchText: 'ace',
			selectedOption: 'Contains',
			shouldFetch: true,
		};

		await act(async () => {
			render(
				<ClientContextProvider client={client}>
					<UseAutoSuggestQuerySample {...params} />
				</ClientContextProvider>
			);
		});

		const resultsList = screen.getAllByRole('listitem');
		expect(resultsList.length).toEqual(12);
		expect(getByText(resultsList[0], 'abiraterone acetate')).toBeInTheDocument();
		expect(getByText(resultsList[1], 'Annonaceous acetogenins')).toBeInTheDocument();
		expect(getByText(resultsList[2], 'carbon C 13 acetate')).toBeInTheDocument();
		expect(getByText(resultsList[3], 'carbon C 14 eribulin acetate')).toBeInTheDocument();
		expect(getByText(resultsList[4], 'carbon-11 acetate')).toBeInTheDocument();
		expect(getByText(resultsList[5], 'caspofungin acetate')).toBeInTheDocument();
		expect(getByText(resultsList[6], 'corticorelin acetate')).toBeInTheDocument();
		expect(getByText(resultsList[7], 'cyproterone acetate')).toBeInTheDocument();
		expect(getByText(resultsList[8], 'deslorelin acetate')).toBeInTheDocument();
		expect(getByText(resultsList[9], 'desmopressin acetate')).toBeInTheDocument();
		expect(getByText(resultsList[10], 'diphtheria toxoid/tetanus toxoid/acellular pertussis adsorbed, recombinant hepatitis B/inactivated poliovirus vaccine combined')).toBeInTheDocument();
		expect(getByText(resultsList[11], 'diphtheria toxoid/tetanus toxoid/acellular pertussis vaccine adsorbed')).toBeInTheDocument();
	});
});
