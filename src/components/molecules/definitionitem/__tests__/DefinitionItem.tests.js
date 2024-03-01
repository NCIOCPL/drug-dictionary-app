import { render, within, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { MockAnalyticsProvider } from '../../../../tracking';

import { DefinitionItem } from '../../../index';
import { useStateValue } from '../../../../store/store';

jest.mock('../../../../store/store.js');
const analyticsHandler = jest.fn(() => {});
const payload = {
	aliases: [
		{
			type: 'USBrandName',
			name: 'Avastin',
		},
		{
			type: 'USBrandName',
			name: 'Mvasi',
		},
		{
			type: 'Synonym',
			name: 'anti-VEGF monoclonal antibody',
		},
		{
			type: 'Synonym',
			name: 'rhuMAb VEGF',
		},
		{
			type: 'Abbreviation',
			name: 'rhuMAb VEGF',
		},
		{
			type: 'Synonym',
			name: 'anti-VEGF humanized monoclonal antibody',
		},
		{
			type: 'Synonym',
			name: 'anti-VEGF rhuMAb',
		},
		{
			type: 'Synonym',
			name: 'recombinant humanized anti-VEGF monoclonal antibody',
		},
		{
			type: 'INDCode',
			name: '9877',
		},
		{
			type: 'INDCode',
			name: '11460',
		},
		{
			type: 'INDCode',
			name: '7921',
		},
		{
			type: 'NSCNumber',
			name: '704865',
		},
		{
			type: 'Abbreviation',
			name: 'rhuMab-VEGF',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar BEVZ92',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar BI 695502',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar FKB238',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar GB-222',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar PF-06439535',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar QL 1101',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar CBT 124',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar MIL60',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar MB02',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar HD204',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar BAT1706',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar HLX04',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar IBI305',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar SCT510',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar LY01008',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar CT-P16',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar RPH-001',
		},
		{
			type: 'Synonym',
			name: 'bevacizumab biosimilar TRS003',
		},
		{
			type: 'CodeName',
			name: 'HD204',
		},
		{
			type: 'Synonym',
			name: 'immunoglobulin G1 (human-mouse monoclonal rhuMab-VEGF gamma-chain anti-human vascular endothelial growth factor), disulfide with human-mouse monoclonal rhuMab-VEGF light chain, dimer',
		},
	],
	definition: {
		html: 'A recombinant humanized monoclonal antibody directed against the vascular endothelial growth factor (VEGF), a pro-angiogenic cytokine.  Bevacizumab binds to VEGF and inhibits VEGF receptor binding, thereby preventing the growth and maintenance of tumor blood vessels.',
		text: 'A recombinant humanized monoclonal antibody directed against the vascular endothelial growth factor (VEGF), a pro-angiogenic cytokine.  Bevacizumab binds to VEGF and inhibits VEGF receptor binding, thereby preventing the growth and maintenance of tumor blood vessels.',
	},
	drugInfoSummaryLink: {
		uri: 'https://www.cancer.gov/about-cancer/treatment/drugs/bevacizumab',
		text: 'Bevacizumab',
	},
	nciConceptId: 'C2039',
	nciConceptName: 'Bevacizumab',
	termId: 43234,
	name: 'bevacizumab',
	firstLetter: 'b',
	type: 'DrugTerm',
	termNameType: 'PreferredName',
	prettyUrlName: 'bevacizumab',
};

const dictionaryName = 'Cancer.gov';
const dictionaryTitle = 'NCI Dictionary of Cancer Terms';
useStateValue.mockReturnValue([
	{
		appId: 'mockAppId',
		basePath: '/',
		dictionaryName,
		dictionaryTitle,
		language: 'en',
	},
]);
describe('Definition Item component', () => {
	const wrapper = render(
		<MockAnalyticsProvider>
			<MemoryRouter initialEntries={['/bevacizumab']}>
				<DefinitionItem drugInfoSummaryLink={payload.drugInfoSummaryLink} definitionText={payload.definition.html} nciConceptId={payload.nciConceptId} aliases={payload.aliases} termId={payload.termId} name={payload.name} />
			</MemoryRouter>
		</MockAnalyticsProvider>
	);
	const { container } = wrapper;

	test('Renders term title and definition container', () => {
		const { getByText } = within(container.querySelector('.dictionary-definiton__term-title'));
		expect(getByText(payload.name)).toBeInTheDocument();
		expect(container.querySelector('.dictionary-definiton__definition')).toBeInTheDocument();
	});

	test('Info button click analytics event', () => {
		const wrapper = render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<MemoryRouter initialEntries={['/bevacizumab']}>
					<DefinitionItem drugInfoSummaryLink={payload.drugInfoSummaryLink} definitionText={payload.definition.html} nciConceptId={payload.nciConceptId} aliases={payload.aliases} termId={payload.termId} name={payload.name} />
				</MemoryRouter>
			</MockAnalyticsProvider>
		);
		const { container } = wrapper;
		const ptInfoButton = container.querySelector('a.dictionary-definiton__patient-information-button');
		fireEvent.click(ptInfoButton);
		expect(analyticsHandler).toHaveBeenCalledTimes(1);
	});
});
