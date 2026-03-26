import { render, screen } from '@testing-library/react';
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
	it('Display grouped synonyms based on data', () => {
		render(<SynonymTable aliases={aliases} />);
		// Check for Map (user friendly name)
		expect(screen.getByText('US brand name:')).toBeInTheDocument();
		// validate data output
		expect(screen.getByText('Flovacil')).toBeInTheDocument();
		expect(screen.getByText('Apo-Diflunisal')).toBeInTheDocument();
		expect(screen.getByText('Novo-Diflunisal')).toBeInTheDocument();
		// Check for Map (user friendly name)
		expect(screen.getByText('Chemical structure:')).toBeInTheDocument();
		//make sure filter removes bad items
		expect(screen.queryByText('ExcludedNameTest')).not.toBeInTheDocument();
		expect(screen.queryByText('22494-42-4')).not.toBeInTheDocument();
	});
});
