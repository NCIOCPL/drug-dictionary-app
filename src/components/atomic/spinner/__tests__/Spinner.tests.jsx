import { render } from '@testing-library/react';
import React from 'react';

import Spinner from '../Spinner';

// Ignoring for this case in-lieu of refactoring. Will reconcile in the shared component library.
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
describe('Spinner component', () => {
	it('should have expected button label and fire onRemove handler', () => {
		const { container } = render(<Spinner />);
		expect(container.querySelector('.nci-spinner')).toBeInTheDocument();
		expect(container.querySelector('.spinkit')).toBeInTheDocument();
		expect(container.querySelector('.dot1')).toBeInTheDocument();
		expect(container.querySelector('.dot2')).toBeInTheDocument();
	});
});
