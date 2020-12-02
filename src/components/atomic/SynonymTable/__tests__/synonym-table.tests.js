import { render } from '@testing-library/react';
import React from 'react';

import SynonymTable from '../synonym-table';

const aliases = [
	{
		type: 'ChemicalStructureName',
		name: "(1,1'-biphenyl)-3-carboxylic acid, 2',4'-difluoro-4-hydroxy-",
	},
	{
		type: 'ChemicalStructureName',
		name: "2',4'-difluoro-4-hydroxy-(1,1'-biphenyl)-3-carboxylic acid",
	},
	{
		type: 'ForeignBrandName',
		name: 'Apo-Diflunisal',
	},
	{
		type: 'USBrandName',
		name: 'Dolobid',
	},
	{
		type: 'ForeignBrandName',
		name: 'Flovacil',
	},
	{
		type: 'ForeignBrandName',
		name: 'Novo-Diflunisal',
	},
	{
		type: 'ExcludedNameTest',
		name: 'shoudlnt render',
	},
	{
		type: 'CASRegistryName',
		name: '22494-42-4',
	},
];

describe('Synonym component', () => {
	test('Display groupd synonyms based on data', () => {
		const wrapper = render(<SynonymTable aliases={aliases} />);
		// Check for Map (user friendly name)
		expect(wrapper.getByText('US brand name:')).toBeInTheDocument();
		// validate data output
		expect(wrapper.getByText('Flovacil')).toBeInTheDocument();
		expect(wrapper.getByText('Apo-Diflunisal')).toBeInTheDocument();
		expect(wrapper.getByText('Novo-Diflunisal')).toBeInTheDocument();
		// Check for Map (user friendly name)
		expect(wrapper.getByText('Chemical structure:')).toBeInTheDocument();
		//make sure filter removes bad items
		expect(wrapper.queryByText('ExcludedNameTest')).not.toBeInTheDocument();
		expect(wrapper.queryByText('22494-42-4')).not.toBeInTheDocument();
	});
});
