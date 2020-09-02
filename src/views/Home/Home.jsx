import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTracking } from 'react-tracking';

import { useAppPaths } from '../../hooks';
import { useStateValue } from '../../store/store.js';

const Home = () => {
	// Pull in the paths we are going to need on this view.
	const { HomePath } = useAppPaths();

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
		name: canonicalHost.replace('https://', '') + HomePath(),
		title: dictionaryTitle,
		metaTitle: `${dictionaryTitle} - ${siteName}`,
		// Any additional properties fall into the "page.additionalDetails" bucket
		// for the event.
	});

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
				href={canonicalHost + HomePath()}
			/>,
			<link
				key="2"
				rel="alternate"
				// TODO: Fix this as it is dirty and does not
				// support multiple languages. (Well, the alternate
				// language dictionary base path does not either... )
				hrefLang={language === 'es' ? 'en' : 'es'}
				href={canonicalHost + altLanguageBasePath + HomePath()}
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
				<meta property="og:url" content={baseHost + HomePath()} />
				<link rel="canonical" href={canonicalHost + HomePath()} />
				<meta name="robots" content="index" />
				{getHrefLangs()}
			</Helmet>
		);
	};

	return (
		<>
			{renderHelmet()}
			<h1>{dictionaryTitle}</h1>
			<div>
				<p>This is the home view.</p>
				<p>
					It can be whatever you like, you don&apos;t even actually need a home
					view, but most of our apps have something. Please do not overload the
					home view with a bunch of other views.
				</p>
			</div>
		</>
	);
};

export default Home;
