import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useTracking } from 'react-tracking';

import { DefinitionItem, SearchBox } from '../../components';
import { useAppPaths, useCustomQuery } from '../../hooks';
import { getDrugDefinition } from '../../services/api/actions';
import { useStateValue } from '../../store/store.js';

const Definition = () => {
	// Pull in the paths we are going to need on this view.
	const { DefinitionPath } = useAppPaths();
	const params = useParams();
	const { drug } = params;
	const queryResponse = useCustomQuery(getDrugDefinition({ drug }));
	const [drugDefinition, setDrugDefinition] = useState();
	const [drugDefinitionLoaded, setDrugDefinitionLoaded] = useState(false);

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

	useEffect(() => {
		if (drugDefinitionLoaded) {
			tracking.trackEvent({
				// These properties are required.
				type: 'PageLoad',
				event: 'DrugDictionaryApp:Load:Definition',
				analyticsName,
				dictionaryTitle,
				name:
					canonicalHost.replace('https://', '') +
					DefinitionPath({
						drug: drugDefinition.payload.prettyUrlName
							? drugDefinition.payload.prettyUrlName
							: drugDefinition.payload.termId,
					}),
				title: dictionaryTitle,
				metaTitle: `Definition of ${drugDefinition.payload.name} - ${dictionaryTitle} - ${siteName}`,
				term: drugDefinition.payload.name,
				id: drugDefinition.payload.termId,
				// Any additional properties fall into the "page.additionalDetails" bucket
				// for the event.
			});
		}
	});

	useEffect(() => {
		if (queryResponse.payload && !drugDefinitionLoaded) {
			setDrugDefinition(queryResponse);
			setDrugDefinitionLoaded(true);
		}
	}, [queryResponse, setDrugDefinition]);

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
				href={
					canonicalHost +
					DefinitionPath({
						drug: drugDefinition.payload.prettyUrlName
							? drugDefinition.payload.prettyUrlName
							: drugDefinition.payload.termId,
					})
				}
			/>,
			<link
				key="2"
				rel="alternate"
				// TODO: Fix this as it is dirty and does not
				// support multiple languages. (Well, the alternate
				// language dictionary base path does not either... )
				hrefLang={language}
				href={
					canonicalHost +
					altLanguageBasePath +
					DefinitionPath({
						drug: drugDefinition.payload.prettyUrlName
							? drugDefinition.payload.prettyUrlName
							: drugDefinition.payload.termId,
					})
				}
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
				<meta property="og:title" content={dictionaryTitle} />
				<meta
					property="og:url"
					content={
						baseHost +
						DefinitionPath({
							drug: drugDefinition.payload.prettyUrlName
								? drugDefinition.payload.prettyUrlName
								: drugDefinition.payload.termId,
						})
					}
				/>
				<link
					rel="canonical"
					href={
						canonicalHost +
						DefinitionPath({
							drug: drugDefinition.payload.prettyUrlName
								? drugDefinition.payload.prettyUrlName
								: drugDefinition.payload.termId,
						})
					}
				/>
				<meta name="robots" content="index" />
				{getHrefLangs()}
			</Helmet>
		);
	};
	return (
		<>
			{drugDefinitionLoaded && drugDefinition && (
				<>
					{renderHelmet()}
					<DefinitionItem payload={drugDefinition.payload} />
					<SearchBox showTitle />
				</>
			)}
		</>
	);
};

export default Definition;
