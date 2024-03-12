import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTracking } from 'react-tracking';

import './Search.scss';

import { Autocomplete, Radio } from '../../atomic';
import { AUTO_SUGGEST_ANALYTICS_CONSTANTS, AUTO_SUGGEST_ANALYTICS_USAGE, searchMatchType, searchMatchTypeAnalyticsMap } from '../../../constants';
import { useAppPaths, useAutoSuggestResultsQuery } from '../../../hooks';
import { useStateValue } from '../../../store/store';
import { emboldenSubstring, getKeyValueFromObject, getKeyValueFromQueryString } from '../../../utils';

const Search = ({ autoSuggestLimit = 10 }) => {
	const { CHARACTERS_TYPED, IS_TERM_SELECTED, ITEMS_COUNT, NUM_OF_TERMS_SELECTED, TERM_SELECTED, USAGE } = AUTO_SUGGEST_ANALYTICS_CONSTANTS;

	const params = useParams();
	const location = useLocation();
	const { searchText: urlParamSearchText } = params;
	const { search } = location;
	const tracking = useTracking();
	const [{ analyticsName, dictionaryTitle }] = useStateValue();
	// Autosuggest analytics default
	const [autoSuggestAnalytics, setAutoSuggestAnalytics] = useState({
		[CHARACTERS_TYPED]: '',
		[IS_TERM_SELECTED]: false,
		[ITEMS_COUNT]: 0,
		[NUM_OF_TERMS_SELECTED]: 0,
		[TERM_SELECTED]: '',
		[USAGE]: AUTO_SUGGEST_ANALYTICS_USAGE.NONE_OFFERED,
	});

	// Set matchType to value retrieved from url if it exits and default to "Begins" if not
	const matchType = search && getKeyValueFromQueryString('searchMode', search) !== null ? getKeyValueFromQueryString('searchMode', search) : searchMatchType.beginsWith;
	// Set default selected option for search match type
	const [selectedOption, setSelectedOption] = useState(matchType);
	// Set default search text to value retrieved from url or set to empty string if not
	const [searchText, setSearchText] = useState(urlParamSearchText ? urlParamSearchText : '');
	const [shouldFetchAutoSuggest, setFetchAutoSuggest] = useState(false);
	const navigate = useNavigate();
	const { SearchPath } = useAppPaths();
	const autoSuggest = useAutoSuggestResultsQuery({
		query: searchText,
		resultLimit: autoSuggestLimit,
		selectedOption,
		shouldFetch: shouldFetchAutoSuggest,
	});
	const searchType = selectedOption && getKeyValueFromObject(selectedOption, searchMatchTypeAnalyticsMap) ? getKeyValueFromObject(selectedOption, searchMatchTypeAnalyticsMap) : searchMatchTypeAnalyticsMap[searchMatchType.beginsWith];

	useEffect(() => {
		// Set selected option value if url parameters change
		setSelectedOption(matchType);
	}, [matchType]);

	const trackSubmit = () => {
		const charactersTyped = autoSuggestAnalytics[IS_TERM_SELECTED] ? autoSuggestAnalytics[CHARACTERS_TYPED] : {};
		const numCharacters = autoSuggestAnalytics[IS_TERM_SELECTED] ? autoSuggestAnalytics[CHARACTERS_TYPED].length : {};
		const termSelected = autoSuggestAnalytics[IS_TERM_SELECTED] ? autoSuggestAnalytics[TERM_SELECTED] : {};
		tracking.trackEvent({
			type: 'Other',
			event: 'DrugDictionaryApp:Other:KeywordSearch',
			linkName: 'DrugDictionarySearch',
			searchTerm: searchText,
			searchType,
			analyticsName,
			autosuggestUsage: autoSuggestAnalytics[IS_TERM_SELECTED] ? autoSuggestAnalytics[USAGE] : autoSuggestAnalytics[ITEMS_COUNT] > 0 || autoSuggest.payload?.length > 0 ? AUTO_SUGGEST_ANALYTICS_USAGE.OFFERED : AUTO_SUGGEST_ANALYTICS_USAGE.NONE_OFFERED,
			...(autoSuggestAnalytics[IS_TERM_SELECTED] && { charactersTyped }),
			dictionaryTitle,
			numSuggestsSelected: autoSuggestAnalytics[NUM_OF_TERMS_SELECTED],
			...(autoSuggestAnalytics[IS_TERM_SELECTED] && { numCharacters }),
			suggestItems: autoSuggestAnalytics[IS_TERM_SELECTED] ? autoSuggestAnalytics[ITEMS_COUNT] : autoSuggest.payload?.length || 0,
			...(autoSuggestAnalytics[IS_TERM_SELECTED] && { termSelected }),
		});
	};

	const executeSearch = (e) => {
		e.preventDefault();
		const isContainsSearch = selectedOption && selectedOption === searchMatchType.contains;
		const hasSearchText = searchText.length > 0;

		let queryString;
		if (hasSearchText) {
			if (isContainsSearch) {
				queryString = `${encodeURIComponent(searchText)}/?searchMode=${searchMatchType.contains}`;
			} else {
				queryString = `${encodeURIComponent(searchText)}/?searchMode=${searchMatchType.beginsWith}`;
			}
		} else {
			queryString = ``;
		}

		trackSubmit();
		navigate(SearchPath({ searchText: queryString }));
	};

	const toggleRadioSelection = (event) => {
		const { value } = event.target;
		setSelectedOption(value);
	};

	const onChangeHandler = (event) => {
		const { value } = event.target;

		// If IS_TERM_SELECTED is true
		// and CHARACTERS_TYPED is contained in TERM_SELECTED
		// set usage to modified
		if (autoSuggestAnalytics[IS_TERM_SELECTED] && autoSuggestAnalytics[TERM_SELECTED].includes(autoSuggestAnalytics[CHARACTERS_TYPED])) {
			setAutoSuggestAnalytics({
				...autoSuggestAnalytics,
				[USAGE]: AUTO_SUGGEST_ANALYTICS_USAGE.MODIFIED,
			});
		}

		setSearchText(value);

		// Make auto suggest API call if search text length >= 3
		if (value.length >= 3 && value.length <= 30) {
			setFetchAutoSuggest(true);
			return;
		}

		setFetchAutoSuggest(false);
	};

	const onSelectHandler = (value) => {
		tracking.trackEvent({
			type: 'Other',
			event: 'DrugDictionaryApp:Other:AutosuggestSelect',
			linkName: 'DrugDictionaryResults',
			searchType,
			analyticsName,
			charactersTyped: searchText,
			dictionaryTitle,
			termSelected: value,
			numCharacters: searchText.length,
			suggestItems: autoSuggest.payload?.length || 0,
		});

		setAutoSuggestAnalytics({
			...autoSuggestAnalytics,
			[CHARACTERS_TYPED]: searchText,
			[IS_TERM_SELECTED]: true,
			[ITEMS_COUNT]: autoSuggest.payload?.length || 0,
			[NUM_OF_TERMS_SELECTED]: autoSuggestAnalytics[NUM_OF_TERMS_SELECTED] + 1,
			[TERM_SELECTED]: value,
			[USAGE]: AUTO_SUGGEST_ANALYTICS_USAGE.SELECTED,
		});

		setSearchText(value);
	};

	return (
		<form className="drug-search" data-testid="tid-search-container" onSubmit={executeSearch}>
			<div className="radio-selection">
				<Radio label="Starts with" id="starts-with" className="inline" value={searchMatchType.beginsWith} defaultChecked={selectedOption === searchMatchType.beginsWith} onChange={toggleRadioSelection} />
				<Radio label="Contains" id="contains" className="inline" value={searchMatchType.contains} defaultChecked={selectedOption === searchMatchType.contains} onChange={toggleRadioSelection} />
			</div>

			<Autocomplete
				id="keywords"
				label="Enter keywords or phrases"
				labelHidden
				wrapperClasses="drug-search__input"
				inputClasses="drug-search__input"
				inputHelpText="Please enter up to 30 characters for your search"
				inputMaxLength={30}
				value={searchText}
				inputProps={{
					placeholder: 'Enter keywords or phrases',
				}}
				items={(!autoSuggest.loading && autoSuggest.payload) || []}
				getItemValue={(item) => item.termName}
				onChange={(event) => onChangeHandler(event)}
				onSelect={(value) => onSelectHandler(value)}
				renderMenu={(children, index) => (
					<div key={index} className="ncids-autocomplete__menu --terms" role="listbox" data-testid="tid-auto-suggest-options">
						{searchText.length >= 3 ? !autoSuggest.loading && autoSuggest.payload?.length ? children : autoSuggest.loading ? <div className="ncids-autocomplete__menu-item">Loading results...</div> : <></> : <div className="ncids-autocomplete__menu-item">Please enter 3 or more characters</div>}
					</div>
				)}
				renderItem={(item, isHighlighted) => (
					<div className={`ncids-autocomplete__menu-item ${isHighlighted ? 'highlighted' : ''}`} role="option" aria-selected={isHighlighted} key={`${item.termName}`}>
						<span
							dangerouslySetInnerHTML={{
								__html: emboldenSubstring(item.termName, searchText),
							}}></span>
					</div>
				)}
			/>
			<input type="submit" className="submit button postfix" id="btnSearch" title="Search" value="Search" />
		</form>
	);
};

Search.propTypes = {
	autoSuggestLimit: PropTypes.number,
};

export default Search;
