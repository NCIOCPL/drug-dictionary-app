import PropTypes from 'prop-types';
import React from 'react';

import './searchbox.scss';

const Searchbox = () => {
	return (
		<div className="row">
			<div className="large-6 columns">
				<input
					type="text"
					onChange={(e) => {
						e.preventDefault();
					}}
					className="dictionary-search-input ui-autocomplete-input"
					value=""
				/>
			</div>
			<div className="large-2 columns left">
				<input
					type="submit"
					className="submit button postfix"
					id="btnSearch"
					title="Search"
					value="Search"
					onChange={(e) => {
						e.preventDefault();
					}}
				/>
			</div>

			<div className="medium-1 columns left" id="helpButton">
				<a className="text-icon-help" aria-label="Help" href="/help#">
					?
				</a>
			</div>
		</div>
	);
};

Searchbox.propTypes = {
	language: PropTypes.oneOf(['en', 'es']),
};

export default Searchbox;
