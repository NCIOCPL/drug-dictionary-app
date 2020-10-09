import PropTypes from 'prop-types';
import React from 'react';

import TermListItem from '../TermListItem';
import { useAppPaths } from '../../../hooks';

const TermList = ({
	searchTerm,
	termLinkTrackingHandler,
	terms,
	totalTermCount,
}) => {
  const { DefinitionPath } = useAppPaths();

	return (
		<>
			<h4> {`${totalTermCount} results found for: ${searchTerm}`} </h4>
			<dl>
				{terms.map((term, index) => {
          const idOrName = term.prettyUrlName ? term.prettyUrlName : term.termId;
					return (
						<TermListItem
							itemIndex={index + 1}
							key={index}
							preferredName={term.preferredName}
							prettyUrlName={term.prettyUrlName}
							term={term.name}
							termDefinition={term?.definition?.html}
							termId={term.termId}
							termLinkTrackingHandler={termLinkTrackingHandler}
							termLinkPath={DefinitionPath({ idOrName })}
						/>
					);
				})}
			</dl>
		</>
	);
};

TermList.propTypes = {
	searchTerm: PropTypes.string.isRequired,
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
