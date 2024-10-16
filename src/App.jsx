import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/app.scss';

import { useAppPaths } from './hooks';
import { Definition, Home, PageNotFound, Terms, SearchResults } from './views';

const App = () => {
	// this should be a DUMB component that just displays our display(group) components
	const { DefinitionPath, ExpandPath, HomePath, SearchPath, SearchNoParamPath } = useAppPaths();

	return (
		<Router>
			<Routes>
				<Route path={HomePath()} element={<Home />} />
				<Route path={DefinitionPath()} element={<Definition />} />
				<Route path={ExpandPath()} element={<Terms />} />
				<Route path={SearchPath()} element={<SearchResults />} />
				<Route path={SearchNoParamPath()} element={<SearchResults />} />
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
