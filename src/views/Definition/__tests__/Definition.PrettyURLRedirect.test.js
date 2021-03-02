import { act, render } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { ClientContextProvider } from 'react-fetching-library';
import Definition from '../Definition';
import { useStateValue } from '../../../store/store.js';
import { MockAnalyticsProvider } from '../../../tracking';

jest.mock('../../../store/store');

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
	useParams: () => ({
		idOrName: '551902',
	}),
}));

let location;

function ComponentWithLocation({ RenderComponent }) {
	location = useLocation();
	return <RenderComponent />;
}

ComponentWithLocation.propTypes = {
	RenderComponent: PropTypes.node,
};

test('Page is redirected to the definition page with a pretty URL name and search param is appended to the url', async () => {
	const dictionaryTitle = 'NCI Drug Dictionary';
	const language = 'en';
	const searchBoxTitle = "Search NCI's Drug Dictionary";

	const client = {
		query: async () => ({
			error: false,
			status: 200,
			payload: {
				aliases: null,
				definition: {
					html:
						'\nA plasmid DNA vaccine, encoding an epitope of mouse tyrosinase, with potential antineoplastic activity. Administered via intramuscular electroporation, vaccination with xenogeneic tyrosinase DNA vaccine may induce both humoral and cytotoxic lymphocyte (CTL) immune responses against melanoma cells that express  tyrosinase, resulting in decreased tumor growth.',
					text:
						'\nA plasmid DNA vaccine, encoding an epitope of mouse tyrosinase, with potential antineoplastic activity. Administered via intramuscular electroporation, vaccination with xenogeneic tyrosinase DNA vaccine may induce both humoral and cytotoxic lymphocyte (CTL) immune responses against melanoma cells that express  tyrosinase, resulting in decreased tumor growth.',
				},
				drugInfoSummaryLink: null,
				nciConceptId: 'C68839',
				nciConceptName: 'Xenogeneic Tyrosinase DNA Vaccine',
				termId: 551902,
				name: 'xenogeneic tyrosinase DNA vaccine',
				firstLetter: 'x',
				type: 'DrugTerm',
				termNameType: 'PreferredName',
				prettyUrlName: 'xenogeneic-tyrosinase-dna-vaccine',
			},
			loading: false,
		}),
	};

	useStateValue.mockReturnValue([
		{
			appId: 'mockAppId',
			canonicalHost: 'https://example.org',
			baseHost: 'http://localhost:3000',
			basePath: '/',
			dictionaryTitle,
			language,
			searchBoxTitle,
		},
	]);

	await act(async () => {
		render(
			<MockAnalyticsProvider>
				<ClientContextProvider client={client}>
					<MemoryRouter initialEntries={['/']}>
						<ComponentWithLocation RenderComponent={Definition} />
					</MemoryRouter>
				</ClientContextProvider>
			</MockAnalyticsProvider>
		);
	});

	const expectedLocationObject = {
		pathname: '/def/xenogeneic-tyrosinase-dna-vaccine',
		search: '?redirect=true',
		hash: '',
		state: null,
		key: expect.any(String),
	};
	expect(location).toMatchObject(expectedLocationObject);
});
