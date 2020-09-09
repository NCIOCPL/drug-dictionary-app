import PropTypes from 'prop-types';
import React from 'react';

import './Synonym.scss';

// Map used to order and also exlude
// items not needed for display"Synonym"
const sortMap = {
	Synonym: { order: 0, name: 'Synonym:' },
	USBrandName: { order: 1, name: 'US brand name:' },
	ForeignBrandName: { order: 2, name: 'Foreign brand name:' },
	Abbreviation: { order: 3, name: 'Abbreviation:' },
	Acronym: { order: 4, name: 'Acronym:' },
	CodeName: { order: 5, name: 'Code name:' },
	ChemicalStructureName: { order: 6, name: 'Chemical structure:' },
	INDCode: { order: 7, name: 'IND number:' },
	NSCNumber: { order: 8, name: 'NSC code:' },
};

const Synonym = (aliases) => {
	// simple compare function to sort list by sortMap order
	const compare = (a, b) => {
		let comparison = 0;
		const typeA = sortMap[a.type]?.order;
		const typeB = sortMap[b.type]?.order;
		if (typeA > typeB) {
			comparison = 1;
		} else if (typeA < typeB) {
			comparison = -1;
		}
		return comparison;
	};
	aliases.aliases.sort(compare);

	// pull the keys to filter things we dont want to list
	var sortKeys = [];
	for (var key in sortMap) sortKeys.push(key);
	const filteredAliases = aliases.aliases.filter(function (e) {
		const myType = e.type;
		return this.indexOf(e.type) > -1;
	}, sortKeys);

	// group items together by Alias type
	const sortedAliases = filteredAliases.reduce((groups, alias) => {
		const aliasType = alias.type;
		if (!groups[aliasType]) groups[aliasType] = [];
		groups[aliasType].push(alias.name);
		return groups;
	}, {});

	// create table DOM
	const aliasDOM = [];
	const aliasTypes = Object.keys(sortedAliases);
	for (let i = 0; i < aliasTypes.length; i++) {
		// get list of names from type object
		const mapVal = sortedAliases[aliasTypes[i]];
		const row = (
			<tr key={`row-${i}`}>
				<td valign="top" width="28%">
					<b>{sortMap[aliasTypes[i]].name}</b>
				</td>
				<td valign="top" width="68%">
					{mapVal.map((item) => {
						return (
							<span key={`alias-${item}`}>
								{item}
								<br />
							</span>
						);
					})}
				</td>
			</tr>
		);
		aliasDOM.push(row);
	}

	return (
		<figure className="table">
			<div className="scrollable">
				<div className="container">
					<table width="100%" cellSpacing="0" cellPadding="0" border="0">
						<tbody>{aliasDOM}</tbody>
					</table>
				</div>
			</div>
		</figure>
	);
};

Synonym.propTypes = {
	language: PropTypes.oneOf(['en', 'es']),
	aliases: PropTypes.array,
};

export default Synonym;
