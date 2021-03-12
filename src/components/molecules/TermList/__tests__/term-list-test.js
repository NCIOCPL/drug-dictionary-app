import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import TermList from '../term-list';
import { useStateValue } from '../../../../store/store';

jest.mock('../../../../store/store.js');

useStateValue.mockReturnValue([
	{
		basePath: '/',
	},
]);

describe('<TermList />', () => {
	const props = {
		searchTerm: 'A',
		termLinkPath: jest.fn(() => {}),
		termLinkTrackingHandler: jest.fn(() => {}),
		terms: [
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
		totalTermCount: 3,
	};
	test.only('should show term list page title with result count', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<TermList {...props} />
			</MemoryRouter>
		);

		expect(screen.getByText('3 results found for: A')).toBeInTheDocument();
	});
});
