import React from 'react';

const NoMatchingResults = () => {
	return (
		<p data-testid="tid-no-matching-results">
			No matches were found for the word or phrase you entered. Please check
			your spelling, and try searching again. You can also type the first few
			letters of your word or phrase, or click a letter in the alphabet and
			browse through the list of terms that begin with that letter.
		</p>
	);
};

export default NoMatchingResults;
