import { act, render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';
import { useLocation, MemoryRouter } from 'react-router-dom';

import SearchResults from '../SearchResults';
import { useStateValue } from '../../../store/store';
import MockAnalyticsProvider from '../../../tracking/mock-analytics-provider';

jest.mock('../../../store/store');

let location;
let wrapper;

function ComponentWithLocation({ RenderComponent }) {
	location = useLocation();
	return <RenderComponent />;
}
ComponentWithLocation.propTypes = {
	RenderComponent: PropTypes.any,
};

describe('<SearchResults />', () => {
	test('should redirect to a definition page when single result is returned from search ', async () => {
		const searchText = 'abaloparatide';
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
				totalResults: 1,
				from: 0,
			},
			results: [
				{
					aliases: [
						{
							type: 'CASRegistryName',
							name: '247062-33-5',
						},
						{
							type: 'USBrandName',
							name: 'Tymlos',
						},
						{
							type: 'CodeName',
							name: 'BIM-44058',
						},
						{
							type: 'CodeName',
							name: 'BA058',
						},
						{
							type: 'ChemicalStructureName',
							name:
								'C2.29-methyl(22-L-glutamic acid(F>E),23-L-leucine(F>L),25-L-glutamic Acid(H>E),26-L-lysine(H>K),28-L-leucine(I>L),30-L-lysine(E>K),31-L-leucine(I>L))human parathyroid hormone-related protein-(1-34)-proteinamide (SY); L-Alaninamide, L-alanyl-L-valyl-L-seryl-L-alpha-glutamyl-L-histidyl-L-glutaminyl-L-leucyl-L-leucyl-L-histidyl-L-alpha-aspartyl-L-lysylglycyl-L-lysyl-L-seryl-L-isoleucyl-L-glutaminyl-L-alpha-aspartyl-L-leucyl-L-arginyl-L-arginyl-L-arginyl-L-alpha-glutamyl-L-leucyl-L-leucyl-L-alpha-glutamyl-L-lysyl-L-leucyl-L-leucyl-2-methylalanyl-L-lysyl-L-leucyl-L-histidyl-L-threonyl-',
						},
					],
					definition: {
						html:
							'A 34 amino acid synthetic analog of human parathyroid hormone-related protein (PTHrP) (PTHrP(1-34) analog), with bone-growing and bone density conserving activities. Upon subcutaneous administration, abaloparatide acts similar to PTHrP and targets, binds to and activates parathyroid hormone 1 (PTH1) receptor (PTH1R), a G protein-coupled receptor (GPCR) expressed in osteoblasts and bone stromal cells. PTH1R activates the cyclic AMP (cAMP) signaling pathway and the bone anabolic signaling pathway, leading to bone growth, increased bone mineral density (BMD) and volume. This correlates with increased bone mass and strength and prevents or treats osteoporosis and decreases fractures.',
						text:
							'A 34 amino acid synthetic analog of human parathyroid hormone-related protein (PTHrP) (PTHrP(1-34) analog), with bone-growing and bone density conserving activities. Upon subcutaneous administration, abaloparatide acts similar to PTHrP and targets, binds to and activates parathyroid hormone 1 (PTH1) receptor (PTH1R), a G protein-coupled receptor (GPCR) expressed in osteoblasts and bone stromal cells. PTH1R activates the cyclic AMP (cAMP) signaling pathway and the bone anabolic signaling pathway, leading to bone growth, increased bone mineral density (BMD) and volume. This correlates with increased bone mass and strength and prevents or treats osteoporosis and decreases fractures.',
					},
					drugInfoSummaryLink: null,
					nciConceptId: 'C158818',
					nciConceptName: 'Abaloparatide',
					termId: 797359,
					name: 'abaloparatide',
					firstLetter: 'a',
					type: 'DrugTerm',
					termNameType: 'PreferredName',
					prettyUrlName: 'abaloparatide',
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
		const expectedLocationObject = {
			pathname: '/def/abaloparatide',
			search: '',
			hash: '',
			state: null,
			key: expect.any(String),
		};

		await act(async () => {
			wrapper = await render(
				<MockAnalyticsProvider>
					<ClientContextProvider client={client}>
						<MemoryRouter
							initialEntries={[`/search/${searchText}/?searchMode=Begins`]}>
							<ComponentWithLocation RenderComponent={SearchResults} />
						</MemoryRouter>
					</ClientContextProvider>
				</MockAnalyticsProvider>
			);
		});
		expect(location).toMatchObject(expectedLocationObject);
	});
});
