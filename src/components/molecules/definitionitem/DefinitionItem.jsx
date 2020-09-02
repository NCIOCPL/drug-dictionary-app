import PropTypes from 'prop-types';
import React from 'react';

import './DefinitionItem.scss';

const DefinitionItem = () => {
	return (
		<dl className="dictionary-list">
			<dt>
				<dfn data-cdr-id="41269">
					<a
						href="/publications/dictionaries/cancer-drug/def/dexverapamil"
						onClick={() => {}}>
						dexverapamil
					</a>
				</dfn>
			</dt>

			<dd className="definition">
				The R-enantiomer of the calcium channel blocker verapamil. Dexverapamil
				competitively inhibits the multidrug resistance efflux pump
				P-glycoprotein (MDR-1), thereby potentially increasing the effectiveness
				of a wide range of antineoplastic drugs which are inactivated by MDR-1
				mechanisms. This agent exhibits decreased calcium antagonistic activity
				and toxicity compared to racemic verapamil. Check for{' '}
				<a
					className="navigation-dark-red"
					href="https://www.cancer.gov/about-cancer/treatment/clinical-trials/intervention/C1563">
					active clinical trials
				</a>{' '}
				using this agent. (
				<a
					className="navigation-dark-red"
					href="https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&amp;code=C1563">
					NCI Thesaurus
				</a>
				)
			</dd>
		</dl>
	);
};

DefinitionItem.propTypes = {
	language: PropTypes.oneOf(['en', 'es']),
	content: PropTypes.object,
};

export default DefinitionItem;
