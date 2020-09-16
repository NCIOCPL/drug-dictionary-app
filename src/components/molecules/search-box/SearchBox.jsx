import React from 'react';
import PropTypes from 'prop-types';

import './SearchBox.scss';

import AZList from '../../atomic/az-list';
import Search from '../search';
import { useStateValue } from '../../../store/store';



const SearchBox = ({ showTitle = false }) => {
	const [{ searchBoxTitle }] = useStateValue();
	let classes = showTitle ? ' bottom' : '';
	return (
		<div
			aria-label={searchBoxTitle}
			className={`search-box-container${classes}`}>
			{showTitle && <h6>{searchBoxTitle}</h6>}
			<Search />
			<AZList />
		</div>
	);
};

SearchBox.propTypes = {
	showTitle: PropTypes.bool,
};

export default SearchBox;
