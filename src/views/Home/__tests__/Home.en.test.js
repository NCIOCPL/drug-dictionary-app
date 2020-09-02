import { act, render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ClientContextProvider } from 'react-fetching-library';


import Home from '../Home';
import { useStateValue } from '../../../store/store.js';
import { MockAnalyticsProvider } from '../../../tracking';


jest.mock('../../../store/store.js');

const analyticsHandler = jest.fn(() => { });
let wrapper;

describe('Home component(English)', () => {
	test('should links on home page', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';
		const title = 'NCI Search Results';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
			},
		]);

		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: {
					"meta": {
						"totalResults": 2,
						"from": 0
					},
					"results": [
						{
							"aliases": [
								{
									"type": "Synonym",
									"name": "acetic acid, glacial"
								},
								{
									"type": "Synonym",
									"name": "glacial acetic acid"
								},
								{
									"type": "CASRegistryName",
									"name": "64-19-7"
								}
							],
							"definition": {
								"html": "A synthetic carboxylic acid with antibacterial and antifungal properties. Although its mechanism of action is not fully known, undissociated acetic acid may enhance lipid solubility allowing increased fatty acid accumulation on the cell membrane or in other cell wall structures. Acetic acid, as a weak acid, can inhibit carbohydrate metabolism resulting in subsequent death of the organism. Check for <a ref=\"https://www.cancer.gov/about-cancer/treatment/clinical-trials/intervention/C61623\">active clinical trials</a> using this agent. (<a ref=\"https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&code=C61623\">NCI Thesaurus</a>)",
								"text": "A synthetic carboxylic acid with antibacterial and antifungal properties. Although its mechanism of action is not fully known, undissociated acetic acid may enhance lipid solubility allowing increased fatty acid accumulation on the cell membrane or in other cell wall structures. Acetic acid, as a weak acid, can inhibit carbohydrate metabolism resulting in subsequent death of the organism. Check for active clinical trials using this agent. (NCI Thesaurus)"
							},
							"drugInfoSummaryLink": null,
							"nciConceptId": "C61623",
							"nciConceptName": "Acetic Acid",
							"termId": 712834,
							"name": "acetic acid",
							"firstLetter": "a",
							"type": "DrugTerm",
							"termNameType": "PreferredName",
							"prettyUrlName": "acetic-acid"
						},
						{
							"aliases": [
								{
									"type": "CodeName",
									"name": "PX-866"
								},
								{
									"type": "ChemicalStructureName",
									"name": "acetic acid (1S,4E,10R,11R,13S,14R)-[4-diallylaminomethylene-6-hydroxy-1-methoxymethyl-10,13-dimethyl-3,7,17-trioxo-1,3,4,7,10,11,12,13,14,15,16,17-dodecahydro-2-oxa-cyclopenta[a]phenanthren-11-yl ester"
								}
							],
							"definition": {
								"html": "A small-molecule wortmannin analogue inhibitor of the alpha, gamma, and delta isoforms of phosphoinositide 3-kinase (PI3K) with potential antineoplastic activity. PI3K inhibitor PX-866 inhibits the production of the secondary messenger phosphatidylinositol-3,4,5-trisphosphate (PIP3) and activation of the PI3K/Akt signaling pathway, which may result in inhibition of tumor cell growth and survival in susceptible tumor cell populations. Activation of the PI3K/Akt signaling pathway is frequently associated with tumorigenesis and dysregulated PI3K/Akt signaling may contribute to tumor resistance to a variety of antineoplastic agents. Check for <a ref=\"https://www.cancer.gov/about-cancer/treatment/clinical-trials/intervention/C78848\">active clinical trials</a> using this agent. (<a ref=\"https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&code=C78848\">NCI Thesaurus</a>)",
								"text": "A small-molecule wortmannin analogue inhibitor of the alpha, gamma, and delta isoforms of phosphoinositide 3-kinase (PI3K) with potential antineoplastic activity. PI3K inhibitor PX-866 inhibits the production of the secondary messenger phosphatidylinositol-3,4,5-trisphosphate (PIP3) and activation of the PI3K/Akt signaling pathway, which may result in inhibition of tumor cell growth and survival in susceptible tumor cell populations. Activation of the PI3K/Akt signaling pathway is frequently associated with tumorigenesis and dysregulated PI3K/Akt signaling may contribute to tumor resistance to a variety of antineoplastic agents. Check for active clinical trials using this agent. (NCI Thesaurus)"
							},
							"drugInfoSummaryLink": null,
							"nciConceptId": "C78848",
							"nciConceptName": "Sonolisib",
							"termId": 612038,
							"name": "PI3K inhibitor PX-866",
							"firstLetter": "p",
							"type": "DrugTerm",
							"termNameType": "PreferredName",
							"prettyUrlName": "sonolisib"
						}
					],
					"links": null
				},
			}),
		};

		await act(async () => {
			render(
				<MockAnalyticsProvider>
					<ClientContextProvider client={client}>
						<MemoryRouter initialEntries={['/']}>
							<Home />
						</MemoryRouter>
					</ClientContextProvider>
				</MockAnalyticsProvider>
			);
		});
		expect(screen.getByText("This is the home view.")).toBeInTheDocument();
	});
});
