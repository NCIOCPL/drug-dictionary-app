import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useTracking } from 'react-tracking';
import { useURLQuery } from '../../hooks';

import { SearchBox, Spinner, SearchTermList } from '../../components';
import { useAppPaths, useCustomQuery } from '../../hooks';
import NoMatchingResults from './no-matching-results';
import { getDrugSearchResults } from '../../services/api/actions';
import { useStateValue } from '../../store/store.js';

const SearchResults = () => {
	const { DefinitionPath, SearchPath } = useAppPaths();
	const params = useParams();
	const { searchText } = params;
	const showMessage = searchText?.length > 30;
	const [searchResultsLoaded, setSearchResultsLoaded] = useState(false);
	const [searchResults, setSearchResults] = useState();
	// Get items passed into index.js and stored in the context.
	const [
		{ analyticsName, baseHost, canonicalHost, dictionaryTitle, siteName },
	] = useStateValue();
	// Get a reference to the tracking function for
	// analytics.
	const tracking = useTracking();
	const navigate = useNavigate();
	const urlQuery = useURLQuery();
	const searchMode = urlQuery.get('searchMode') || 'Begins';
	const textToSearch = searchMode === 'Begins' ? searchText : searchText.length > 30 ? searchText.substr(0, 30) : searchText;
	const queryResponse = useCustomQuery(
		getDrugSearchResults({ drug: textToSearch, matchType: searchMode })
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Set doneFetchingTermResults to false when query parameter changes
	useEffect(() => {
		setSearchResultsLoaded(false);
	}, [searchText]);

	//navigate to a definition page when single result is returned from search
	useEffect(() => {
		if (!queryResponse.loading && queryResponse.payload) {
			if (queryResponse.payload.meta?.totalResults === 1) {
				const idOrName = queryResponse.payload.results[0].prettyUrlName
					? queryResponse.payload.results[0].prettyUrlName
					: queryResponse.payload.results[0].termId;

				navigate(DefinitionPath({ idOrName }), { replace: true });

			}

			setSearchResults(queryResponse);
			setSearchResultsLoaded(true);
		}
	}, [queryResponse.loading, queryResponse.payload]);

	useEffect(() => {
		// Fire off a page load event. Usually this would be in
		// some effect when something loaded.
		if (searchResultsLoaded) {
			tracking.trackEvent({
				// These properties are required.
				type: 'PageLoad',
				event: 'DrugDictionaryApp:Load:SearchResults',
				analyticsName,
				dictionaryTitle,
				name:
					canonicalHost.replace('https://', '') + SearchPath({ searchText }),
				title: dictionaryTitle,
				metaTitle: `${dictionaryTitle} - ${siteName}`,
				numberResults: searchResults.payload.meta?.totalResults,
				searchKeyword: searchText,
				searchType: searchMode === 'Begins' ? 'StartsWith' : searchMode,
				// Any additional properties fall into the "page.additionalDetails" bucket
				// for the event.
			});
		}
	}, [searchResultsLoaded]);

	/**
	 * Helper function to render metadata.
	 */
	const renderHelmet = () => {
		return (
			<Helmet>
				<title>{`${dictionaryTitle} - ${siteName}`}</title>
				<meta property="og:title" content={dictionaryTitle} />
				<meta
					property="og:url"
					content={baseHost + SearchPath({ searchText })}
				/>
				<link
					rel="canonical"
					href={canonicalHost + SearchPath({ searchText })}
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
			<h1>{dictionaryTitle}</h1>
			<SearchBox />
			{renderHelmet()}
			{searchResultsLoaded && searchResults ? (
				<div className="results">
					{/*{showMessage && searchMode === 'Contains' && searchResults.payload.results.length > 1 && (
						<span className="limited-query-message">
							Queries are limited to 30 characters. Any characters after the 30th will not be included in the search.
						</span>
					)}*/}
					{searchResults.payload.results.length > 1 && (
						<SearchTermList
							searchTerm={textToSearch}
							termLinkPath={SearchPath}
							termLinkTrackingHandler={termLinkEventTrackingHandler}
							terms={searchResults.payload.results}
							totalTermCount={searchResults.payload.meta.totalResults}
						/>
					)}
					{searchResults.payload.results.length < 1 && <NoMatchingResults />}
				</div>
			) : (
					<Spinner />
				)}
		</>
	);
};

export default SearchResults;
