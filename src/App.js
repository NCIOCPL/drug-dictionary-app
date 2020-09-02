import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import track from 'react-tracking';

import './styles/app.scss';

import { useAppPaths } from './hooks';
import { Home, PageNotFound } from './views';

const App = ({ tracking }) => {
	// this should be a DUMB component that just displays our display(group) components
	const { HomePath } = useAppPaths();

	return (
		<Router>
			<Routes>
				<Route path={HomePath()} element={<Home />} />
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
		</Router>
	);
};

App.propTypes = {
	tracking: PropTypes.object,
};

export default track({
	page: 'app_load',
})(App);
