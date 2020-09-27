import PropTypes from 'prop-types';
import React from 'react';

import './term-list-item.scss';

const TermListItem = ({
	itemIndex,
	preferredName,
	prettyUrlName,
	term,
	termDefinition,
	termId,
	termLinkPath,
	termLinkTrackingHandler,
}) => {
	const idOrName = prettyUrlName ? prettyUrlName : termId;
	const definitionText = termDefinition
		? termDefinition
		: `(Other name for: ${preferredName})`;

	const termLinkClickHandler = () => {
		if (termLinkTrackingHandler) {
			termLinkTrackingHandler({ idOrName, itemIndex, term });
		}
	};

	return (
		<>
			<dt>
				<dfn data-cdr-id={termId}>
					<a href={termLinkPath({ idOrName })} onClick={termLinkClickHandler}>
						{term}
					</a>
				</dfn>
			</dt>
			<dd dangerouslySetInnerHTML={{ __html: definitionText }}></dd>
		</>
	);
};

TermListItem.propTypes = {
	itemIndex: PropTypes.number.isRequired,
	preferredName: PropTypes.string,
	prettyUrlName: PropTypes.string,
	term: PropTypes.string.isRequired,
	termDefinition: PropTypes.string,
	termId: PropTypes.number.isRequired,
	termLinkPath: PropTypes.any.isRequired,
	termLinkTrackingHandler: PropTypes.func,
};

export default TermListItem;
