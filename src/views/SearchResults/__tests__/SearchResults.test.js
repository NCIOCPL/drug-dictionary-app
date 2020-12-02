import { act, render, screen } from '@testing-library/react';
import React from 'react';
import PropTypes from 'prop-types';
import { ClientContextProvider } from 'react-fetching-library';
import { useLocation,MemoryRouter, useNavigate, useParams } from 'react-router-dom';

import { useStateValue } from '../../../store/store';
import SearchResults from '../SearchResults';
import MockAnalyticsProvider from '../../../tracking/mock-analytics-provider';

jest.mock('../../../store/store');
jest.mock('react-router-dom');

describe('<SearchResults />', () => {

	test('should display dictionary title, <SearchBox />, and <TermList /> components', async () => {
		jest.spyOn(window, 'scrollTo');
		const searchText = 'Bez';
		useParams.mockReturnValue({
			searchText,
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
				totalResults: 3,
				from: 0,
			},
			results: [
				{
					aliases: [
						{
							type: 'CodeName',
							name: 'MK-6072',
						},
						{
							type: 'CodeName',
							name: 'MK 6072',
						},
						{
							type: 'CodeName',
							name: 'MK6072',
						},
						{
							type: 'USBrandName',
							name: 'Zinplava',
						},
						{
							type: 'CASRegistryName',
							name: '1246264-45-8',
						},
					],
					definition: {
						html:
							'A human monoclonal antibody directed against Clostridium difficile Toxin B (TcdB), with anti-toxin activity. Upon intravenous infusion, the two Fab regions of bezlotoxumab bind to two distinct epitopes within the N-terminal half of the TcdB combined repetitive oligopeptide (CROP) domain, blocking the carbohydrate binding pockets of the toxin and preventing binding of the toxin to target host cells. TcdB is one of two exotoxins responsible for the symptoms of Clostridium difficile infections.',
						text:
							'A human monoclonal antibody directed against Clostridium difficile Toxin B (TcdB), with anti-toxin activity. Upon intravenous infusion, the two Fab regions of bezlotoxumab bind to two distinct epitopes within the N-terminal half of the TcdB combined repetitive oligopeptide (CROP) domain, blocking the carbohydrate binding pockets of the toxin and preventing binding of the toxin to target host cells. TcdB is one of two exotoxins responsible for the symptoms of Clostridium difficile infections.',
					},
					drugInfoSummaryLink: null,
					nciConceptId: 'C153084',
					nciConceptName: 'Bezlotoxumab',
					termId: 793939,
					name: 'bezlotoxumab',
					firstLetter: 'b',
					type: 'DrugTerm',
					termNameType: 'PreferredName',
					prettyUrlName: 'bezlotoxumab',
				},
				{
					aliases: [
						{
							type: 'Synonym',
							name:
								'Zedoary rhizome/Pseudobulbus cremastrae seu pleiones/Yatantzu/Strychni pulveratum/beehive/artificial bezoar/Bombyx mori/Danshen root/Radix astragali/Angelica/camphol alcohol capsule',
						},
					],
					definition: {
						html:
							'A capsule-based formulation containing artificial bezoar, Strychni pulveratum (strychnos powder), camphol alcohol (borneol or borneo camphor) and extracts from Zedoary rhizome (Rhizoma curcumae), Pseudobulbus cremastrae seu pleiones (dried pseudobulb of Cremastra appendiculata), Yatantzu (seed of Brucca javanica), beehive, Bombyx mori (Bombyx batryticatus or silkworm), Danshen (dried root of Salvia miltiorrhiza or red sage root), Radix astragali, and Angelica, with potential antineoplastic activity. Upon oral administration of the cidan herbal capsule, the active ingredients in the plant extracts may induce tumor cell apoptosis and reduce tumor cell proliferation.',
						text:
							'A capsule-based formulation containing artificial bezoar, Strychni pulveratum (strychnos powder), camphol alcohol (borneol or borneo camphor) and extracts from Zedoary rhizome (Rhizoma curcumae), Pseudobulbus cremastrae seu pleiones (dried pseudobulb of Cremastra appendiculata), Yatantzu (seed of Brucca javanica), beehive, Bombyx mori (Bombyx batryticatus or silkworm), Danshen (dried root of Salvia miltiorrhiza or red sage root), Radix astragali, and Angelica, with potential antineoplastic activity. Upon oral administration of the cidan herbal capsule, the active ingredients in the plant extracts may induce tumor cell apoptosis and reduce tumor cell proliferation.',
					},
					drugInfoSummaryLink: null,
					nciConceptId: 'C118451',
					nciConceptName: 'Cidan Herbal Capsule',
					termId: 765191,
					name: 'Cidan herbal capsule',
					firstLetter: 'c',
					type: 'DrugTerm',
					termNameType: 'PreferredName',
					prettyUrlName: 'cidan-herbal-capsule',
				},
				{
					aliases: [
						{
							type: 'CodeName',
							name: 'BEZ235',
						},
						{
							type: 'LexicalVariant',
							name: 'PI3K/mTOR Inhibitor BEZ235',
						},
						{
							type: 'Synonym',
							name: 'NVP-BEZ235',
						},
					],
					definition: {
						html:
							'An orally bioavailable imidazoquinoline targeting the phosphatidylinositol 3 kinase (PI3K) and the mammalian target of rapamycin (mTOR), with potential antineoplastic activity. PI3K/mTOR inhibitor BEZ235 inhibits PI3K kinase and mTOR kinase in the PI3K/AKT/mTOR kinase signaling pathway, which may result in tumor cell apoptosis and growth inhibition in PI3K/mTOR-overexpressing tumor cells. Activation of the PI3K/mTOR pathway promotes cell growth, survival, and resistance to chemotherapy and radiotherapy; mTOR, a serine/threonine kinase downstream of PI3K, may also be activated independent of PI3K.',
						text:
							'An orally bioavailable imidazoquinoline targeting the phosphatidylinositol 3 kinase (PI3K) and the mammalian target of rapamycin (mTOR), with potential antineoplastic activity. PI3K/mTOR inhibitor BEZ235 inhibits PI3K kinase and mTOR kinase in the PI3K/AKT/mTOR kinase signaling pathway, which may result in tumor cell apoptosis and growth inhibition in PI3K/mTOR-overexpressing tumor cells. Activation of the PI3K/mTOR pathway promotes cell growth, survival, and resistance to chemotherapy and radiotherapy; mTOR, a serine/threonine kinase downstream of PI3K, may also be activated independent of PI3K.',
					},
					drugInfoSummaryLink: null,
					nciConceptId: 'C74072',
					nciConceptName: 'Dactolisib',
					termId: 589292,
					name: 'PI3K/mTOR kinase inhibitor BEZ235',
					firstLetter: 'p',
					type: 'DrugTerm',
					termNameType: 'PreferredName',
					prettyUrlName: 'dactolisib',
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
						<SearchResults />
					</ClientContextProvider>
				</MockAnalyticsProvider>
			);
		});
		expect(screen.getByText('NCI Drug Dictionary')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('Enter keywords or phrases')
		).toBeInTheDocument();
		expect(screen.getByText('3 results found for: Bez')).toBeInTheDocument();
		//test the scroll position
		expect(window.scrollTo).toHaveBeenCalledTimes(1);
		expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
	});

	test('should display no matching results when no results are returned', async () => {
		const searchText = 'w w.';
		useParams.mockReturnValue({
			searchText,
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
						<SearchResults />
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
