import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { MockAnalyticsProvider } from '../../../../tracking';
import { SearchBox } from '../../../index';
import { useStateValue } from '../../../../store/store';

jest.mock('../../../../store/store.jsx');

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

describe('SearchBox component', () => {
	const renderComponent = () => {
		return render(
			<MockAnalyticsProvider>
				<MemoryRouter initialEntries={['/']}>
					<SearchBox />
				</MemoryRouter>
			</MockAnalyticsProvider>
		);
	};

	it('Renders with child components [ Search | AZList ]', () => {
		renderComponent();

		// Search component should be rendered
		expect(screen.getByTestId('tid-search-container')).toBeInTheDocument();
		// AZList component should be rendered
		expect(screen.getByTestId('tid-az-list')).toBeInTheDocument();
	});
});
