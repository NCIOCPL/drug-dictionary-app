import PropTypes from 'prop-types';
import React from 'react';

import './DefinitionItem.scss';

import { SynonymTable } from '../../atomic';

const DefinitionItem = ({ payload }) => {
	return (
		<dl className="dictionary-list">
			<dt>
				<dfn data-cdr-id={payload.termId}>
					<span>{payload.name}</span>
				</dfn>
			</dt>

			<dd
				className="definition"
				dangerouslySetInnerHTML={{
					__html: payload.definition.html,
				}}></dd>
			{payload.aliases && <SynonymTable aliases={payload.aliases} />}
		</dl>
	);
};

DefinitionItem.propTypes = {
	payload: PropTypes.object,
};

export default DefinitionItem;
