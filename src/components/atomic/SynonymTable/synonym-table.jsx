import PropTypes from 'prop-types';
import React from 'react';

import './synonym-table.scss';

// Map used to order and also exlude
// items not needed for display"Synonym"
const sortMap = {
	Synonym: { order: 1, name: 'Synonym:' },
	USBrandName: { order: 2, name: 'US brand name:' },
	ForeignBrandName: { order: 3, name: 'Foreign brand name:' },
	Abbreviation: { order: 4, name: 'Abbreviation:' },
	Acronym: { order: 5, name: 'Acronym:' },
	CodeName: { order: 6, name: 'Code name:' },
	ChemicalStructureName: { order: 7, name: 'Chemical structure:' },
	INDCode: { order: 8, name: 'IND number:' },
	NSCNumber: { order: 9, name: 'NSC code:' },
};

const SynonymTable = (aliases) => {
	// simple compare function to sort list by sortMap order
	const compare = (a, b) => {
		let comparison = 0;
		const typeA = sortMap[a.type]?.order || 99;
		const typeB = sortMap[b.type]?.order || 99;
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
		mapVal.sort((a, b) => a.localeCompare(b));
		const row = (
			<tr key={`row-${i}`}>
				<th valign="top" width="28%" scope="row">
					<b>{sortMap[aliasTypes[i]].name}</b>
				</th>
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
			<table className="synonym" width="100%" cellSpacing="0" cellPadding="0" border="0">
				<tbody>{aliasDOM}</tbody>
			</table>
		</figure>
	);
};

SynonymTable.propTypes = {
	language: PropTypes.oneOf(['en', 'es']),
	aliases: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string,
			name: PropTypes.string,
		})
	),
};

export default SynonymTable;
