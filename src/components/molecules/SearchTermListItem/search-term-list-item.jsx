import PropTypes from 'prop-types';
import React from 'react';

import SynonymList from '../../atomic/SynonymList';

import { Link } from 'react-router-dom';

const SearchTermListItem = ({ aliases, itemIndex, preferredName, prettyUrlName, searchTerm, term, termDefinition, termId, termLinkPath, termLinkTrackingHandler }) => {
	const idOrName = prettyUrlName ? prettyUrlName : termId;
	const definitionText = termDefinition ? termDefinition : `(Other name for: ${preferredName})`;

	const termLinkClickHandler = () => {
		if (termLinkTrackingHandler) {
			termLinkTrackingHandler({ idOrName, itemIndex, term });
		}
	};
	const showAliases = aliases?.length;
	return (
		<>
			<dt key={termId}>
				<dfn data-cdr-id={termId}>
					<Link to={termLinkPath} onClick={termLinkClickHandler}>
						{term}
					</Link>
					{showAliases && <SynonymList aliases={aliases} term={searchTerm} />}
				</dfn>
			</dt>
			<dd dangerouslySetInnerHTML={{ __html: definitionText }}></dd>
		</>
	);
};

SearchTermListItem.propTypes = {
	aliases: PropTypes.arrayOf(PropTypes.object),
	itemIndex: PropTypes.number.isRequired,
	preferredName: PropTypes.string,
	prettyUrlName: PropTypes.string,
	searchTerm: PropTypes.string,
	term: PropTypes.string.isRequired,
	termDefinition: PropTypes.string,
	termId: PropTypes.number.isRequired,
	termLinkPath: PropTypes.string.isRequired,
	termLinkTrackingHandler: PropTypes.func,
};

export default SearchTermListItem;
