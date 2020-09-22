import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useTracking } from 'react-tracking';

import { DefinitionItem, SearchBox } from '../../components';
import { useAppPaths, useCustomQuery } from '../../hooks';
import { getDrugDefinition } from '../../services/api/actions';
import { useStateValue } from '../../store/store.js';

const Definition = () => {
	// Pull in the paths we are going to need on this view.
	const { DefinitionPath } = useAppPaths();
	const params = useParams();
	const { idOrName } = params;
	const queryResponse = useCustomQuery(getDrugDefinition({ idOrName }));
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
	const navigate = useNavigate();

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
						idOrName: drugDefinition.payload.prettyUrlName
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
			//redirect to PrettyUrlName when ID is provided in the url
			if (
				queryResponse.payload.prettyUrlName &&
				idOrName.match(/^[0-9]+$/) != null
			) {
				const path = `${queryResponse.payload.prettyUrlName}?redirect=true`;
				navigate(DefinitionPath({ idOrName: path }));
				return;
			}
		}
	}, [queryResponse, setDrugDefinition]);

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
							idOrName: drugDefinition.payload.prettyUrlName
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
							idOrName: drugDefinition.payload.prettyUrlName
								? drugDefinition.payload.prettyUrlName
								: drugDefinition.payload.termId,
						})
					}
				/>
				<meta name="robots" content="noindex" />
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
