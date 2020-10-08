import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ClientContextProvider } from 'react-fetching-library';

import Home from '../Home';
import { useStateValue } from '../../../store/store.js';
import { MockAnalyticsProvider } from '../../../tracking';

jest.mock('../../../store/store.js');
jest.mock('react-router-dom');

describe('Home component(English)', () => {
	test('should display dictionary title, intro text, <SearchBox />, and <TermList /> components', async () => {
		const expandChar = 'A';
		useParams.mockReturnValue({
			expandChar,
		});
		useLocation.mockReturnValue({
			location: {},
		});
		useStateValue.mockReturnValue([
			{
				analyticsName: 'Drug',
				appId: 'mockAppId',
				baseHost: 'http://localhost:3000',
				canonicalHost: 'https://example.org',
				basePath: '/',
				dictionaryIntroText: 'The NCI Drug Dictionary contains technical definitions and synonyms for drugs/agents used to treat patients with cancer or conditions related to cancer. Each drug entry includes links to check for clinical trials listed in NCI\'s List of Cancer Clinical Trials.',
				dictionaryTitle: 'NCI Drug Dictionary',
				language: 'en',
				siteName: 'National Cancer Institute',
			},
		]);
		const payload = {
			meta: {
				totalResults: 3,
				from: 0,
			},
			results: [
				{
					aliases: [
						{
							type: 'CodeName',
							name: 'A-101',
						},
						{
							type: 'Synonym',
							name: 'A-101 solution',
						},
					],
					definition: {
						html:
							'A proprietary topical formulation consisting of a high-concentration of hydrogen peroxide (H2O2), with potential keratolytic activity. Upon administration of the A-101 topical solution to an affected area of skin, the hydrogen peroxide penetrates into the cells, increases oxygen content, produces reactive oxygen species (ROS), causes oxidative stress and induces apoptosis through oxidative damage. This may clear the affected skin cells and remove common warts (verruca vulgaris) or seborrheic keratosis (SK).',
						text:
							'A proprietary topical formulation consisting of a high-concentration of hydrogen peroxide (H2O2), with potential keratolytic activity. Upon administration of the A-101 topical solution to an affected area of skin, the hydrogen peroxide penetrates into the cells, increases oxygen content, produces reactive oxygen species (ROS), causes oxidative stress and induces apoptosis through oxidative damage. This may clear the affected skin cells and remove common warts (verruca vulgaris) or seborrheic keratosis (SK).',
					},
					drugInfoSummaryLink: null,
					nciConceptId: 'C150374',
					nciConceptName: 'A-101 Topical Solution',
					termId: 792737,
					name: 'A-101 topical solution',
					firstLetter: 'a',
					type: 'DrugTerm',
					termNameType: 'PreferredName',
					prettyUrlName: 'a-101-topical-solution',
				},
				{
					aliases: [
						{
							type: 'CodeName',
							name: 'EOS100850',
						},
						{
							type: 'CodeName',
							name: 'EOS-100850',
						},
						{
							type: 'CodeName',
							name: 'EOS 100850',
						},
					],
					definition: {
						html:
							'An orally bioavailable immune checkpoint inhibitor and antagonist of the adenosine A2A receptor (A2AR; ADORA2A), with potential immunomodulating and antineoplastic activities. Upon administration, A2AR antagonist EOS100850 selectively binds to and inhibits A2AR expressed on T-lymphocytes. This prevents tumor-released adenosine from interacting with the A2A receptors, thereby blocking the adenosine/A2AR-mediated inhibition of T-lymphocytes. This results in the proliferation and activation of T-lymphocytes, and stimulates a T-cell-mediated immune response against tumor cells. A2AR, a G protein-coupled receptor, is highly expressed on the cell surfaces of T-cells and, upon activation by adenosine, inhibits their proliferation and activation. Adenosine is often overproduced by cancer cells and plays a key role in immunosuppression.',
						text:
							'An orally bioavailable immune checkpoint inhibitor and antagonist of the adenosine A2A receptor (A2AR; ADORA2A), with potential immunomodulating and antineoplastic activities. Upon administration, A2AR antagonist EOS100850 selectively binds to and inhibits A2AR expressed on T-lymphocytes. This prevents tumor-released adenosine from interacting with the A2A receptors, thereby blocking the adenosine/A2AR-mediated inhibition of T-lymphocytes. This results in the proliferation and activation of T-lymphocytes, and stimulates a T-cell-mediated immune response against tumor cells. A2AR, a G protein-coupled receptor, is highly expressed on the cell surfaces of T-cells and, upon activation by adenosine, inhibits their proliferation and activation. Adenosine is often overproduced by cancer cells and plays a key role in immunosuppression.',
					},
					drugInfoSummaryLink: null,
					nciConceptId: null,
					nciConceptName: null,
					termId: 801361,
					name: 'A2A receptor antagonist EOS100850',
					firstLetter: 'a',
					type: 'DrugTerm',
					termNameType: 'PreferredName',
					prettyUrlName: 'a2a-receptor-antagonist-eos100850',
				},
				{
					aliases: [
						{
							type: 'CodeName',
							name: '1592U89',
						},
						{
							type: 'USBrandName',
							name: 'Ziagen',
						},
						{
							type: 'CASRegistryName',
							name: '188062-50-2',
						},
					],
					definition: {
						html:
							'A sulfate salt form of abacavir, a nucleoside reverse transcriptase inhibitor analog of guanosine. This agent decreases HIV viral loads, retards or prevents the damage to the immune system, and reduces the risk of developing AIDS.',
						text:
							'A sulfate salt form of abacavir, a nucleoside reverse transcriptase inhibitor analog of guanosine. This agent decreases HIV viral loads, retards or prevents the damage to the immune system, and reduces the risk of developing AIDS.',
					},
					drugInfoSummaryLink: null,
					nciConceptId: 'C28804',
					nciConceptName: 'Abacavir Sulfate',
					termId: 770208,
					name: 'abacavir sulfate',
					firstLetter: 'a',
					type: 'DrugTerm',
					termNameType: 'PreferredName',
					prettyUrlName: 'abacavir-sulfate',
				},
			],
			links: null,
		};
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload,
			}),
		};
		await act(async () => {
			render(
				<MockAnalyticsProvider>
					<ClientContextProvider client={client}>
						<Home />
					</ClientContextProvider>
				</MockAnalyticsProvider>
			);
		});
		expect(screen.getByText('NCI Drug Dictionary')).toBeInTheDocument();
		expect(
			screen.getByText(
				'The NCI Drug Dictionary contains technical definitions and synonyms for drugs/agents used to treat patients with cancer or conditions related to cancer. Each drug entry includes links to check for clinical trials listed in NCI\'s List of Cancer Clinical Trials.'
			)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('Enter keywords or phrases')
		).toBeInTheDocument();
		expect(screen.getByText('3 results found for: A')).toBeInTheDocument();
	});

	test('should display no matching results when no results are returned', async () => {
		const expandChar = ']';
		useParams.mockReturnValue({
			expandChar,
		});
		useLocation.mockReturnValue({
			location: {},
		});
		useStateValue.mockReturnValue([
			{
				analyticsName: 'Drug',
				appId: 'mockAppId',
				baseHost: 'http://localhost:3000',
				canonicalHost: 'https://example.org',
				basePath: '/',
				dictionaryTitle: 'NCI Drug Dictionary',
				language: 'en',
				siteName: 'National Cancer Institute',
			},
		]);
		const payload = {
			meta: {
				totalResults: 0,
				from: 0,
			},
			results: [],
			links: null,
		};
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload,
			}),
		};
		await act(async () => {
			render(
				<MockAnalyticsProvider>
					<ClientContextProvider client={client}>
						<Home />
					</ClientContextProvider>
				</MockAnalyticsProvider>
			);
		});
		expect(
			screen.getByText(
				'No matches were found for the word or phrase you entered. Please check your spelling, and try searching again. You can also type the first few letters of your word or phrase, or click a letter in the alphabet and browse through the list of terms that begin with that letter.'
			)
		).toBeInTheDocument();
	});
});
