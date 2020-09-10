import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTracking } from 'react-tracking';

import { AZListArray } from '../../../constants';
import { useAppPaths } from '../../../hooks';
import { useStateValue } from '../../../store/store';

const AZList = ({ azListLabel = 'Browse' }) => {
	const { ExpandPath } = useAppPaths();
	const [{ analyticsName, dictionaryTitle }] = useStateValue();
	const tracking = useTracking();

	useEffect(() => {
		AZListArray.push('All');
	}, []);

	const handleAZLinkClick = (letter) => {
		tracking.trackEvent({
			type: 'Other',
			event: 'DrugDictionaryApp:Other:AZClick',
			linkName: 'DrugDictionarySearchAlphaList',
			analyticsName,
			letter,
			dictionaryTitle
		});
	};

	return (
		<nav className="az-list" data-testid="tid-az-list">
			<span className="browse">{azListLabel}:</span>
			<ul>
				{AZListArray.map((item, i) => {
					const expandChar =
						item === '#'
							? '%23'
							: item !== 'All'
								? item.toUpperCase()
								: item;
					const label = item !== 'All' ? item.toUpperCase() : item;
					return (
						<li key={i} value={i + 1}>
							<Link
								to={ExpandPath({ expandChar })}
								onClick={() => handleAZLinkClick(expandChar)}>
								{label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

AZList.propTypes = {
	azListLabel: PropTypes.string,
};

export default AZList;
