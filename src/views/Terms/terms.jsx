import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useTracking } from 'react-tracking';

import { SearchBox, Spinner, TermList } from '../../components';
import { useAppPaths, useCustomQuery } from '../../hooks';
import NoMatchingResults from './no-matching-results';
import { getExpandCharResults } from '../../services/api/actions';
import { useStateValue } from '../../store/store';

const Terms = () => {
	const { DefinitionPath, ExpandPath } = useAppPaths();
	const params = useParams();
	const { expandChar } = params;
	const [doneFetchingTermResults, setDoneFetchingTermResults] = useState(false);
	const [stateExpandCharResults, setStateExpandCharResults] = useState();
	// Get items passed into index.js and stored in the context.
	const [
		{ analyticsName, baseHost, canonicalHost, dictionaryTitle, siteName },
	] = useStateValue();
	// Get a reference to the tracking function for
	// analytics.
	const tracking = useTracking();

	const expandCharResults = useCustomQuery(getExpandCharResults(expandChar));

	// Set doneFetchingTermResults to false when query parameter changes
	useEffect(() => {
		setDoneFetchingTermResults(false);
	}, [expandChar]);

	// Set doneFetchingTermResults to false when query parameter changes
	useEffect(() => {
		// Fire off a page load event. Usually this would be in
		// some effect when something loaded.
		if (doneFetchingTermResults) {
			tracking.trackEvent({
				// These properties are required.
				type: 'PageLoad',
				event: 'DrugDictionaryApp:Load:ExpandResults',
				analyticsName,
				dictionaryTitle,
				name:
					canonicalHost.replace('https://', '') + ExpandPath({ expandChar }),
				title: dictionaryTitle,
				metaTitle: `${dictionaryTitle} - ${siteName}`,
				letter: expandChar,
				numberResults: stateExpandCharResults.meta?.totalResults,
				// Any additional properties fall into the "page.additionalDetails" bucket
				// for the event.
			});
		}
	}, [doneFetchingTermResults]);

	useEffect(() => {
		if (!expandCharResults.loading && expandCharResults.payload) {
			setStateExpandCharResults(expandCharResults.payload);
			setDoneFetchingTermResults(true);
		}
	}, [expandCharResults.loading, expandCharResults.payload]);

	/**
	 * Helper function to render metadata.
	 */
	const renderHelmet = () => {
		return (
			<Helmet>
				<title>{`${dictionaryTitle} - ${siteName}`}</title>
				<meta property="og:title" content={`${dictionaryTitle}`} />
				<meta
					property="og:url"
					content={baseHost + ExpandPath({ expandChar })}
				/>
				<link
					rel="canonical"
					href={canonicalHost + ExpandPath({ expandChar })}
				/>
				<meta name="robots" content="noindex" />
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
			<SearchBox />
			{doneFetchingTermResults ? (
				<div className="results">
					{stateExpandCharResults.results.length > 0 && (
						<TermList
							searchTerm={expandChar}
							termLinkPath={DefinitionPath}
							termLinkTrackingHandler={termLinkEventTrackingHandler}
							terms={stateExpandCharResults.results}
							totalTermCount={stateExpandCharResults.meta.totalResults}
						/>
					)}
					{stateExpandCharResults.results.length < 1 && <NoMatchingResults />}
				</div>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default Terms;
