import PropTypes from 'prop-types';
import React from 'react';

import './DefinitionItem.scss';

import { SynonymTable } from '../../atomic';
import { useStateValue } from '../../../store/store.js';

const DefinitionItem = ({
	drugInfoSummaryLink,
	definitionText,
	nciConceptId,
	termId,
	aliases,
	name,
}) => {
	const [
		{ nciThesaurusConceptLink, ctsDynamicListingPageBase },
	] = useStateValue();

	const renderSupplementalLinks = () => {
		return (
			<div className="dictionary-definiton__supplemental-links">
				<a
					className="dictionary-definiton__active-trials-link"
					href={`${ctsDynamicListingPageBase}/${nciConceptId}`}>
					Check for active clinical trials using this agent
				</a>
				<a
					className="dictionary-definiton__nci-thesaurus-link"
					href={`${nciThesaurusConceptLink}&code=${nciConceptId}`}>
					View this agent in the NCI Thesaurus
				</a>
			</div>
		);
	};

	return (
		<>
			<h1 className="dictionary-definiton__term-title" data-cdr-id={termId}>
				{name}
			</h1>
			{drugInfoSummaryLink && (
				<a
					className="dictionary-definiton__patient-information-button"
					href={drugInfoSummaryLink.uri}>
					View Patient Information
				</a>
			)}
			<div className="dictionary-definiton__term-definition">
				<div className="dictionary-definiton__definition">{definitionText}</div>
				{nciConceptId && renderSupplementalLinks(nciConceptId)}
				{aliases && <SynonymTable aliases={aliases} />}
			</div>
		</>
	);
};

DefinitionItem.propTypes = {
	drugInfoSummaryLink: PropTypes.object,
	definitionText: PropTypes.string,
	nciConceptId: PropTypes.string,
	aliases: PropTypes.array,
	termId: PropTypes.number,
	name: PropTypes.string,
};

export default DefinitionItem;
