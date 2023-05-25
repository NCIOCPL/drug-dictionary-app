import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTracking } from 'react-tracking';
import { useStateValue } from '../../store/store';
import { i18n } from '../../utils';
import { useAppPaths } from '../../hooks';
import { searchMatchType } from '../../constants';

const PageNotFound = () => {
	const [{ canonicalHost, language, analyticsName, dictionaryTitle }] =
		useStateValue();
	const tracking = useTracking();
	const { SearchPath } = useAppPaths();
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const pageTitle = i18n.pageNotFoundTitle[language];
		tracking.trackEvent({
			event: 'DrugDictionaryApp:Load:PageNotFound',
			metaTitle: pageTitle,
			name: `${canonicalHost.replace('https://', '')}${
				window.location.pathname
			}`,
			title: pageTitle,
			type: 'PageLoad',
			dictionaryTitle,
			analyticsName,
		});
	}, []);

	const contentPar =
		language === 'es'
			? [
					<>No podemos encontrar la página que busca.</>,
					<>
						Visite la{' '}
						<a href="https://www.cancer.gov/espanol">página principal</a>,
						busque por{' '}
						<a href="https://www.cancer.gov/espanol/tipos">tipo de cáncer</a>, o
						use la casilla de búsqueda en la parte de abajo de esta página.
					</>,
					<>
						¿Tiene una pregunta?{' '}
						<a href="https://www.cancer.gov/espanol/contactenos">Contáctenos</a>
						.
					</>,
			  ]
			: [
					<>We can&apos;t find the page you&apos;re looking for.</>,
					<>
						Visit the <a href="https://www.cancer.gov">homepage</a>, browse by{' '}
						<a href="https://www.cancer.gov/types">cancer type</a>, or use the
						search below.
					</>,
					<>
						Have a question?{' '}
						<a href="https://www.cancer.gov/contact">Get in touch</a>.
					</>,
			  ];

	const executeSearch = (event) => {
		event.preventDefault();
		const queryString =
			searchText.length > 1
				? `${searchText}/?searchMode=${searchMatchType.beginsWith}`
				: `/`;
		window.location = `${SearchPath({ searchText: queryString })}`;
	};

	const renderHelmet = () => {
		return (
			<Helmet>
				<title>{i18n.pageNotFoundTitle[language]}</title>
				<meta property="dcterms.subject" content="Error Pages" />
				<meta property="dcterms.type" content="errorpage" />
			</Helmet>
		);
	};

	return (
		<>
			{renderHelmet()}
			<div className="error-container">
				<h1>{i18n.pageNotFoundTitle[language]}</h1>
				<>
					{contentPar.map((content, index) => (
						<p key={index}>{content}</p>
					))}
				</>
				<form name="kwSearch" className="error-searchbar">
					<input
						id="keywords"
						type="text"
						className="ncids-input searchString"
						aria-required="false"
						aria-label={i18n.search[language]}
						autoComplete="off"
						onChange={(event) => setSearchText(event.target.value)}
					/>
					<input
						type="submit"
						className="submit button postfix"
						id="btnSearch"
						title={i18n.search[language]}
						value={i18n.search[language]}
						onClick={executeSearch}
					/>
				</form>
			</div>
		</>
	);
};

export default PageNotFound;
