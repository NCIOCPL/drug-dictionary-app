import PropTypes from 'prop-types';
import React from 'react';

import './DefinitionItem.scss';

const DefinitionItem = ({ payload }) => {
	return (
		<dl>
			<dt>
				<dfn data-cdr-id={payload.termId}>
						<span>{payload.name}</span>
				</dfn>
			</dt>

			<dd className="definition"
				dangerouslySetInnerHTML={{
					__html: payload.definition.html,
				}}
			>
			</dd>
		</dl>
	);
};

DefinitionItem.propTypes = {
	payload: PropTypes.object,
};

export default DefinitionItem;
