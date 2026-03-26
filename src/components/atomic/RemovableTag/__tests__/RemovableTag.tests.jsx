import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import RemovableTag from '../RemovableTag';

describe('RemovableTag component', () => {
	it('should have expected button label and fire onRemove handler', () => {
		const key = 'test-id';
		const label = 'Mock Label';
		const onRemove = jest.fn();

		render(<RemovableTag key={key} label={label} onRemove={onRemove} />);

		// Find the removable tag container
		const tagContainer = screen.getByRole('option', { name: label });
		expect(tagContainer).toHaveClass('cts-removable-tag');

		// Check if the label is correct
		const tagLabel = screen.getByText(label);
		expect(tagLabel).toHaveClass('cts-removable-tag__label');

		// Find the button
		const tagButton = screen.getByRole('button', { name: `remove ${label}` });
		expect(tagButton).toHaveClass('cts-removable-tag__button');
		expect(tagButton).toHaveValue(label);

		// Test the click handler
		fireEvent.click(tagButton);
		expect(onRemove).toHaveBeenCalled();
	});
});
