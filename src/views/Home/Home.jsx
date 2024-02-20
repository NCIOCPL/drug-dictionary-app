import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTracking } from 'react-tracking';

import { SearchBox, Spinner, TermList } from '../../components';
import { useAppPaths, useCustomQuery } from '../../hooks';
import { getExpandCharResults } from '../../services/api/actions';
import { useStateValue } from '../../store/store.js';
import NoMatchingResults from '../Terms/no-matching-results';

const Home = () => {
	// Pull in the paths we are going to need on this view.
	const { DefinitionPath, HomePath } = useAppPaths();
	const expandChar = 'A';
	const [doneFetchingTermResults, setDoneFetchingTermResults] = useState(false);
	const [stateExpandCharResults, setStateExpandCharResults] = useState();

	// Get items passed into index.js and stored in the context.
	const [{ analyticsName, baseHost, canonicalHost, dictionaryIntroText, dictionaryTitle, siteName }] = useStateValue();

	// Get a reference to the tracking function for
	// analytics.
	const tracking = useTracking();

	const expandCharResults = useCustomQuery(getExpandCharResults(expandChar));

	useEffect(() => {
		if (!expandCharResults.loading && expandCharResults.payload) {
			setStateExpandCharResults(expandCharResults.payload);
			setDoneFetchingTermResults(true);
		}
	}, [expandCharResults.loading, expandCharResults.payload]);

	useEffect(() => {
		if (doneFetchingTermResults) {
			// Fire off a page load event. Usually this would be in
			// some effect when something loaded.
			tracking.trackEvent({
				// These properties are required.
				type: 'PageLoad',
				event: 'DrugDictionaryApp:Load:ExpandResults',
				analyticsName,
				dictionaryTitle,
				name: canonicalHost.replace('https://', '') + HomePath(),
				title: dictionaryTitle,
				metaTitle: `${dictionaryTitle} - ${siteName}`,
				letter: expandChar.toLowerCase(),
				numberResults: stateExpandCharResults.meta?.totalResults,
				// Any additional properties fall into the "page.additionalDetails" bucket
				// for the event.
			});
		}
	}, [doneFetchingTermResults]);

	/**
	 * Helper function to render metadata.
	 */
	const renderHelmet = () => {
		// Home is indexable, expand and search are not.

		return (
			<Helmet>
				<title>{`${dictionaryTitle} - ${siteName}`}</title>
				<meta property="og:title" content={`${dictionaryTitle}`} />
				<meta property="og:url" content={baseHost + HomePath()} />
				<link rel="canonical" href={canonicalHost + HomePath()} />
				<meta name="robots" content="index" />
			</Helmet>
		);
	};

	const termLinkEventTrackingHandler = ({ idOrName, itemIndex, term }) => {
		tracking.trackEvent({
			// These properties are required.
			type: 'Other',
			event: 'DrugDictionaryApp:Other:ResultClick',
			linkName: 'DrugDictionaryResults',
			dictionaryTitle,
			analyticsName,
			resultIdOrName: idOrName,
			resultIndex: itemIndex,
			resultName: term,
			// Any additional properties fall into the "page.additionalDetails" bucket
			// for the event.
		});
	};

	return (
		<>
			{renderHelmet()}
			<h1>{dictionaryTitle}</h1>
			<p dangerouslySetInnerHTML={{ __html: dictionaryIntroText }}></p>
			<SearchBox />
			{doneFetchingTermResults ? (
				<div className="results">
					{stateExpandCharResults.results.length > 0 && <TermList searchTerm={expandChar} termLinkPath={DefinitionPath} termLinkTrackingHandler={termLinkEventTrackingHandler} terms={stateExpandCharResults.results} totalTermCount={stateExpandCharResults.meta.totalResults} />}
					{stateExpandCharResults.results.length < 1 && <NoMatchingResults />}
				</div>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default Home;
