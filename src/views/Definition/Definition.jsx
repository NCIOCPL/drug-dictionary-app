import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useLocation } from 'react-router-dom';
import { useTracking } from 'react-tracking';

import { AZList, Searchbox, DefinitionItem } from '../../components';
import { useAppPaths, useCustomQuery, useURLQuery } from '../../hooks';
import { getDrugSearchResults } from '../../services/api/actions';
import { useStateValue } from '../../store/store.js';
import { i18n } from '../../utils';

const Definition = () => {
	// Pull in the paths we are going to need on this view.
	const { DefinitionPath } = useAppPaths();
	const params = useParams();
	const { drug } = params;
	const queryResponse = useCustomQuery(getDrugSearchResults({ drug }));
	const [drugSearchResults, setDrugSearchResults] = useState();
	const [searchResultsLoaded, setSearchResultsLoaded] = useState(false);

	// Get items passed into index.js and stored in the context.
	const [
		{
			analyticsName,
			altLanguageBasePath,
			basePath,
			baseHost,
			canonicalHost,
			dictionaryTitle,
			siteName,
			language,
		},
	] = useStateValue();

	// Get a reference to the tracking function for
	// analytics.
	const tracking = useTracking();

	// Fire off a page load event. Usually this would be in
	// some effect when something loaded.
	tracking.trackEvent({
		// These properties are required.
		type: 'PageLoad',
		event: 'DrugDictionaryApp:Load:Home',
		analyticsName,
		dictionaryTitle,
		name: canonicalHost.replace('https://', '') + DefinitionPath(),
		title: dictionaryTitle,
		metaTitle: `${dictionaryTitle} - ${siteName}`,
		// Any additional properties fall into the "page.additionalDetails" bucket
		// for the event.
	});

	useEffect(() => {
		if (queryResponse.payload && !searchResultsLoaded) {
			setDrugSearchResults(queryResponse);
			setSearchResultsLoaded(true);
		}
	}, [queryResponse, setDrugSearchResults]);

	/**
	 * Helper function to get href lang links IF there is an
	 * alternate language.
	 */
	const getHrefLangs = () => {
		if (!altLanguageBasePath) {
			return;
		}

		return [
			<link
				key="1"
				rel="alternate"
				hrefLang={language}
				href={canonicalHost + DefinitionPath()}
			/>,
			<link
				key="2"
				rel="alternate"
				// TODO: Fix this as it is dirty and does not
				// support multiple languages. (Well, the alternate
				// language dictionary base path does not either... )
				hrefLang={language === 'es' ? 'en' : 'es'}
				href={canonicalHost + altLanguageBasePath + DefinitionPath()}
			/>,
		];
	};

	/**
	 * Helper function to render metadata.
	 */
	const renderHelmet = () => {
		// Home is indexable, expand and search are not.

		return (
			<Helmet>
				<title>{`${dictionaryTitle} - ${siteName}`}</title>
				<meta property="og:title" content={`${dictionaryTitle}`} />
				<meta property="og:url" content={baseHost + DefinitionPath()} />
				<link rel="canonical" href={canonicalHost + DefinitionPath()} />
				<meta name="robots" content="index" />
				{getHrefLangs()}
			</Helmet>
		);
	};
	if (searchResultsLoaded) {
		console.dir(drugSearchResults);
	}
	return (
		<>
			{renderHelmet()}
			<h1>{dictionaryTitle}</h1>
			<div>
				<p>
					The NCI Drug Dictionary contains technical definitions and synonyms
					for drugs/agents used to treat patients with cancer or conditions
					related to cancer. Each drug entry includes links to check for
					clinical trials listed in NCI&#39;s List of Cancer Clinical Trials.
				</p>
				<Searchbox />
				<AZList />
				<DefinitionItem />
			</div>
		</>
	);
};

export default Definition;
