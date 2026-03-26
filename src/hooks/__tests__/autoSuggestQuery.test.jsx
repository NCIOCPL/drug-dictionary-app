import { render, screen } from '@testing-library/react';
import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';

import UseAutoSuggestQuerySample from '../samples/UseAutoSuggestQuerySample';

describe('autoSuggestQuery hook', () => {
	it('should display "No Results" text when payload is empty', async () => {
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: [],
			}),
		};

		const params = {
			searchText: 'bev',
			selectedOption: 'Begins',
			shouldFetch: true,
		};

		render(
			<ClientContextProvider client={client}>
				<UseAutoSuggestQuerySample {...params} />
			</ClientContextProvider>
		);

		expect(await screen.findByText('No Results')).toBeInTheDocument();
	});

	it('should return 2 items that match payload provided', async () => {
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: [
					{
						termId: 43234,
						termName: 'bevacizumab',
					},
					{
						termId: 729590,
						termName: 'bevacizumab-IRDye 800CW',
					},
				],
			}),
		};

		const params = {
			searchText: 'bev',
			selectedOption: 'Begins',
			shouldFetch: true,
		};

		render(
			<ClientContextProvider client={client}>
				<UseAutoSuggestQuerySample {...params} />
			</ClientContextProvider>
		);

		const resultsList = await screen.findAllByRole('listitem');
		expect(resultsList).toHaveLength(2);
		expect(screen.getByText('bevacizumab')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab-IRDye 800CW')).toBeInTheDocument();
	});

	it('should return default 10 items that match payload when more than 10 items are provided', async () => {
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: [
					{ termId: 43234, termName: 'bevacizumab biosimilar BAT1706' },
					{ termId: 43234, termName: 'bevacizumab biosimilar BEVZ92' },
					{ termId: 43234, termName: 'bevacizumab biosimilar BI 695502' },
					{ termId: 43234, termName: 'bevacizumab biosimilar CBT 124' },
					{ termId: 43234, termName: 'bevacizumab biosimilar CT-P16' },
					{ termId: 43234, termName: 'bevacizumab biosimilar FKB238' },
					{ termId: 43234, termName: 'bevacizumab biosimilar GB-222' },
					{ termId: 43234, termName: 'bevacizumab biosimilar HD204' },
					{ termId: 43234, termName: 'bevacizumab biosimilar HLX04' },
					{ termId: 43234, termName: 'bevacizumab biosimilar IBI305' },
					{ termId: 43234, termName: 'bevacizumab biosimilar LY01008' },
					{ termId: 43234, termName: 'bevacizumab biosimilar MB02' },
					{ termId: 43234, termName: 'bevacizumab biosimilar MIL60' },
					{ termId: 43234, termName: 'bevacizumab biosimilar PF-06439535' },
					{ termId: 43234, termName: 'bevacizumab biosimilar QL 1101' },
				],
			}),
		};

		const params = {
			searchText: 'beva',
			selectedOption: 'Begins',
			shouldFetch: true,
		};

		render(
			<ClientContextProvider client={client}>
				<UseAutoSuggestQuerySample {...params} />
			</ClientContextProvider>
		);

		const resultsList = await screen.findAllByRole('listitem');
		expect(resultsList).toHaveLength(10);
		expect(screen.getByText('bevacizumab biosimilar BAT1706')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab biosimilar BEVZ92')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab biosimilar BI 695502')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab biosimilar CBT 124')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab biosimilar CT-P16')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab biosimilar FKB238')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab biosimilar GB-222')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab biosimilar HD204')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab biosimilar HLX04')).toBeInTheDocument();
		expect(screen.getByText('bevacizumab biosimilar IBI305')).toBeInTheDocument();
	});

	it('should return 12 items given autoSuggestLimit of 12 that match payload', async () => {
		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: [
					{ termId: 552704, termName: 'abiraterone acetate' },
					{ termId: 766482, termName: 'Annonaceous acetogenins' },
					{ termId: 762469, termName: 'carbon C 13 acetate' },
					{ termId: 646836, termName: 'carbon C 14 eribulin acetate' },
					{ termId: 362071, termName: 'carbon-11 acetate' },
					{ termId: 38182, termName: 'caspofungin acetate' },
					{ termId: 385686, termName: 'corticorelin acetate' },
					{ termId: 39203, termName: 'cyproterone acetate' },
					{ termId: 357620, termName: 'deslorelin acetate' },
					{ termId: 734496, termName: 'desmopressin acetate' },
					{ termId: 561774, termName: 'diphtheria toxoid/tetanus toxoid/acellular pertussis adsorbed, recombinant hepatitis B/inactivated poliovirus vaccine combined' },
					{ termId: 561776, termName: 'diphtheria toxoid/tetanus toxoid/acellular pertussis vaccine adsorbed' },
				],
			}),
		};

		const params = {
			autoSuggestLimit: 12,
			searchText: 'ace',
			selectedOption: 'Contains',
			shouldFetch: true,
		};

		render(
			<ClientContextProvider client={client}>
				<UseAutoSuggestQuerySample {...params} />
			</ClientContextProvider>
		);

		const resultsList = await screen.findAllByRole('listitem');
		expect(resultsList).toHaveLength(12);
		expect(screen.getByText('abiraterone acetate')).toBeInTheDocument();
		expect(screen.getByText('Annonaceous acetogenins')).toBeInTheDocument();
		expect(screen.getByText('carbon C 13 acetate')).toBeInTheDocument();
		expect(screen.getByText('carbon C 14 eribulin acetate')).toBeInTheDocument();
		expect(screen.getByText('carbon-11 acetate')).toBeInTheDocument();
		expect(screen.getByText('caspofungin acetate')).toBeInTheDocument();
		expect(screen.getByText('corticorelin acetate')).toBeInTheDocument();
		expect(screen.getByText('cyproterone acetate')).toBeInTheDocument();
		expect(screen.getByText('deslorelin acetate')).toBeInTheDocument();
		expect(screen.getByText('desmopressin acetate')).toBeInTheDocument();
		expect(screen.getByText('diphtheria toxoid/tetanus toxoid/acellular pertussis adsorbed, recombinant hepatitis B/inactivated poliovirus vaccine combined')).toBeInTheDocument();
		expect(screen.getByText('diphtheria toxoid/tetanus toxoid/acellular pertussis vaccine adsorbed')).toBeInTheDocument();
	});
});
