import React from 'react';

import { useCustomQuery } from '../customFetch';

const UseCustomQuerySample = (id) => {
	const { loading, payload } = useCustomQuery(getSampleCallResults(id));
	return <>{!loading && payload && <h1>{payload.contentMessage}</h1>}</>;
};

const getSampleCallResults = ({ id }) => {
	return {
		method: 'GET',
		endpoint: `/sampleendpoint/${id}`,
	};
};

export default UseCustomQuerySample;
