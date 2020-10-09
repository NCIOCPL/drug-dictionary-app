import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

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
					<Link
						to={termLinkPath}
						onClick={termLinkClickHandler}>
						{term}
					</Link>
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
	termLinkPath: PropTypes.string.isRequired,
	termLinkTrackingHandler: PropTypes.func,
};

export default TermListItem;
