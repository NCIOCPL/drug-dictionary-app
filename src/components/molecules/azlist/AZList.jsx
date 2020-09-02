import PropTypes from 'prop-types';
import React from 'react';

import './AZList.scss';

const AZList = () => {
	return (
		<div className="azlist_container">
			<span className="browse">Browse:</span>
			<ul>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=A">A</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=B">B</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=C">C</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=D">D</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=E">E</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=F">F</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=G">G</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=H">H</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=I">I</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=J">J</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=K">K</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=L">L</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=M">M</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=N">N</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=O">O</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=P">P</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=Q">Q</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=R">R</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=S">S</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=T">T</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=U">U</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=V">V</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=W">W</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=X">X</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=Y">Y</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=Z">Z</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=%23">#</a>
				</li>
				<li>
					<a href="/publications/dictionaries/cancer-drug?expand=All">All</a>
				</li>
			</ul>
		</div>
	);
};

AZList.propTypes = {
	language: PropTypes.oneOf(['en', 'es']),
};

export default AZList;
