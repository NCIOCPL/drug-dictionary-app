import PropTypes from 'prop-types';
import React from 'react';

import './DefinitionItem.scss';

import { SynonymTable } from '../../atomic';

const DefinitionItem = ({ payload }) => {
	const drugInfoSummaryLink = payload?.drugInfoSummaryLink;
	const definitionText = payload.definition?.html;

	return (
		<>
			<h1 className="term-title" data-cdr-id={payload.termId}>
				{payload.name}
			</h1>

			{drugInfoSummaryLink && (
				<a className="definition-link" href={drugInfoSummaryLink.uri}>
					<img
						src="https://www.cancer.gov/images/btn-patient-info.gif"
						alt="Patient Information"
						title="Patient Information"
						width="139"
						height="20"
						hspace="12"
						border="0"
						align="absmiddle"
					/>
				</a>
			)}
			<div className="term-definition">
				<div className="definition">{definitionText}</div>
				{payload.aliases && <SynonymTable aliases={payload.aliases} />}
			</div>
		</>
	);
};

DefinitionItem.propTypes = {
	payload: PropTypes.object,
};

export default DefinitionItem;
