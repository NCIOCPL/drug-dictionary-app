import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import TermListItem from '../term-list-item';

describe('<TermListItem />', () => {
	test('should display term, definition, data-cdr-id attribute with termId as value, and term link with prettyUrlName in href value', () => {
		const itemIndex = 2;
		const prettyUrlName = 'c-kit-inhibitor-plx9486';
		const term = 'c-Kit inhibitor PLX9486';
		const termDefinition = 'An orally bioavailable protein tyrosine kinase inhibitor of mutated forms of the tumor-associated antigen mast/stem cell factor receptor c-Kit (SCFR), with potential antineoplastic activity. Upon oral administration, c-Kit inhibitor PLX9486 binds to and inhibits specific c-Kit mutants. This may result in an inhibition of tumor cell proliferation in cancer cell types that overexpress these c-Kit mutations. c-Kit, a transmembrane protein and receptor tyrosine kinase, is overexpressed in solid tumors and hematological malignancies; it plays a key role in the regulation of cell differentiation and proliferation.';
		const termId = 770823;
		const termLinkPath = '/def/c-kit-inhibitor-plx9486';

		const { container } = render(
			<MemoryRouter initialEntries={['/']}>
				<TermListItem itemIndex={itemIndex} prettyUrlName={prettyUrlName} term={term} termDefinition={termDefinition} termId={termId} termLinkPath={termLinkPath} />
			</MemoryRouter>
		);

		expect(screen.getByText('c-Kit inhibitor PLX9486')).toBeInTheDocument();
		expect(screen.getByText(termDefinition)).toBeInTheDocument();
		expect(container.querySelector('a')).toHaveAttribute('href', '/def/c-kit-inhibitor-plx9486');
		expect(container.querySelector('dfn')).toHaveAttribute('data-cdr-id', `${termId}`);
	});

	test('should display term link with termId in href attribute value when there is no prettyUrlName', () => {
		const itemIndex = 2;
		const term = 'c-Kit inhibitor PLX9486';
		const termDefinition = 'An orally bioavailable protein tyrosine kinase inhibitor of mutated forms of the tumor-associated antigen mast/stem cell factor receptor c-Kit (SCFR), with potential antineoplastic activity. Upon oral administration, c-Kit inhibitor PLX9486 binds to and inhibits specific c-Kit mutants. This may result in an inhibition of tumor cell proliferation in cancer cell types that overexpress these c-Kit mutations. c-Kit, a transmembrane protein and receptor tyrosine kinase, is overexpressed in solid tumors and hematological malignancies; it plays a key role in the regulation of cell differentiation and proliferation.';
		const termId = 770823;
		const termLinkPath = '/def/770823';
		console.error = jest.fn();
		const { container } = render(
			<MemoryRouter initialEntries={['/']}>
				<TermListItem itemIndex={itemIndex} term={term} termDefinition={termDefinition} termId={termId} termLinkPath={termLinkPath} />
			</MemoryRouter>
		);
		fireEvent.click(screen.getByRole('link'));
		expect(container.querySelector('a')).toHaveAttribute('href', '/def/770823');
	});

	test('should display preferred name in place of definition when term definition is not present', () => {
		const props = {
			itemIndex: 1,
			preferredName: 'etaracizumab',
			term: 'Abegrin',
			termId: 38491,
			termLinkPath: '/def/etaracizumab',
			prettyUrlName: 'etaracizumab',
		};

		render(
			<MemoryRouter initialEntries={['/']}>
				<TermListItem {...props} />
			</MemoryRouter>
		);
		expect(screen.getByText('(Other name for: etaracizumab)')).toBeInTheDocument();
	});

	test('should call trackingHandler function once when term link is clicked', () => {
		const itemIndex = 2;
		const prettyUrlName = 'c-kit-inhibitor-plx9486';
		const term = 'c-Kit inhibitor PLX9486';
		const termDefinition = 'An orally bioavailable protein tyrosine kinase inhibitor of mutated forms of the tumor-associated antigen mast/stem cell factor receptor c-Kit (SCFR), with potential antineoplastic activity. Upon oral administration, c-Kit inhibitor PLX9486 binds to and inhibits specific c-Kit mutants. This may result in an inhibition of tumor cell proliferation in cancer cell types that overexpress these c-Kit mutations. c-Kit, a transmembrane protein and receptor tyrosine kinase, is overexpressed in solid tumors and hematological malignancies; it plays a key role in the regulation of cell differentiation and proliferation.';
		const termId = 770823;
		const termLinkPath = '/def/c-kit-inhibitor-plx9486';
		const termLinkTrackingHandler = jest.fn();
		console.error = jest.fn();
		render(
			<MemoryRouter initialEntries={['/']}>
				<TermListItem itemIndex={itemIndex} prettyUrlName={prettyUrlName} term={term} termDefinition={termDefinition} termId={termId} termLinkTrackingHandler={termLinkTrackingHandler} termLinkPath={termLinkPath} />
			</MemoryRouter>
		);
		const termLink = screen.getByRole('link');
		expect(termLink.textContent).toBe('c-Kit inhibitor PLX9486');
		fireEvent.click(termLink);
		expect(termLinkTrackingHandler).toHaveBeenCalledTimes(1);
	});
});
