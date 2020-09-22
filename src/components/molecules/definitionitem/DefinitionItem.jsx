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
				<a
					className="patient-information-button"
					href={drugInfoSummaryLink.uri}>
					View Patient Information
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
