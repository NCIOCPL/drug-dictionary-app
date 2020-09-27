import PropTypes from 'prop-types';
import React from 'react';

import TermListItem from '../TermListItem';

const TermList = ({
	searchTerm,
	termLinkPath,
	termLinkTrackingHandler,
	terms,
	totalTermCount,
}) => {
	return (
		<>
			<h4> {`${totalTermCount} results found for: ${searchTerm}`} </h4>
			<dl>
				{terms.map((term, index) => {
					return (
						<TermListItem
							itemIndex={index+1}
							key={index}
							preferredName={term.preferredName}
							prettyUrlName={term.prettyUrlName}
							term={term.name}
							termDefinition={term?.definition?.html}
							termId={term.termId}
							termLinkTrackingHandler={termLinkTrackingHandler}
							termLinkPath={termLinkPath}
						/>
					);
				})}
			</dl>
		</>
	);
};

TermList.propTypes = {
	searchTerm: PropTypes.string.isRequired,
	termLinkPath: PropTypes.any.isRequired,
	termLinkTrackingHandler: PropTypes.func,
	terms: PropTypes.arrayOf(PropTypes.shape({
		aliases: PropTypes.arrayOf(PropTypes.object),
		definition: PropTypes.objectOf(PropTypes.string),
		drugInfoSummaryLink: PropTypes.any,
		firstLetter: PropTypes.string,
		name: PropTypes.string,
		nciConceptId: PropTypes.string,
		nciConceptName: PropTypes.string,
		prettyUrlName: PropTypes.string,
		termId: PropTypes.number,
		termNameType: PropTypes.string,
		type: PropTypes.string,
	})).isRequired,
	totalTermCount: PropTypes.number.isRequired,
};

export default TermList;
