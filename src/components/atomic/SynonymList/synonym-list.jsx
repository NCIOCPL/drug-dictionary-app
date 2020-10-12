import PropTypes from 'prop-types';
import React from 'react';
import { useURLQuery } from '../../../hooks';

const SynonymList = ({ aliases, term, language = 'en' }) => {
	const urlQuery = useURLQuery();
	const searchMode = urlQuery.get('searchMode') || 'Contains';
	// make list of aliases that match serach term
	const getAliasList = (aliasArray) => {
		let aliasList = [];
		const amount = aliasArray?.length || 0;
		for (let i = 0; i < amount; i++) {
			const item = aliasArray[i];
			if (
				searchMode === 'Contains' &&
				item.name.toLowerCase().includes(term.toLowerCase())
			) {
				aliasList.push(<li key={`synonym-${i}-${item.name}`}>{item.name}</li>);
			} else if (item.name.toLowerCase().startsWith(term.toLowerCase())) {
				aliasList.push(<li key={`synonym-${i}-${item.name}`}>{item.name}</li>);
			}
		}
		//bail out if after sorting list is empty
		if (aliasList.length < 1) return;
		return (
			<ul
				aria-label={`synonym table for ${term}`}
				className="search-results-alias-list">
				<li>Matching synonym</li>
				{aliasList}
			</ul>
		);
	};

	return <>{getAliasList(aliases)}</>;
};

SynonymList.propTypes = {
	aliases: PropTypes.arrayOf(PropTypes.object),
	language: PropTypes.oneOf(['en', 'es']),
	term: PropTypes.string.isRequired,
};

export default SynonymList;
