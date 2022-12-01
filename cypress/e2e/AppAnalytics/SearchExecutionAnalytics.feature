Feature: Search Execution Analytics

	Scenario: When a user clicks on the search button for a starts with search, and they selected an autosuggestion, an analytics click event will be fired.
		Given "dictionaryTitle" is set to "NCI Drug Dictionary"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsPublishedDate" is set to "02/02/2011"
		And "analyticsName" is set to "Drug"
		When the user visits the home page
		And search bar contains a placeholder text "Enter keywords or phrases"
		And user types "bev" in the search bar
		And browser waits
		And selects the "bevacizumab" entry
		And the user clicks the search button
		Then there should be an analytics event with the following details
			| key                      | value                                 |
			| type                     | Other                                 |
			| event                    | DrugDictionaryApp:Other:KeywordSearch |
			| linkName                 | DrugDictionarySearch                  |
			| data.dictionaryTitle     | NCI Drug Dictionary                   |
			| data.analyticsName       | Drug                                  |
			| data.autosuggestUsage    | Selected                              |
			| data.searchTerm          | bevacizumab                           |
			| data.searchType          | starts with                           |
			| data.charactersTyped     | bev                                   |
			| data.termSelected        | bevacizumab                           |
			| data.numCharacters       | (int)3                                |
			| data.suggestItems        | (int)10                               |
			| data.numSuggestsSelected | (int)1                                |

	Scenario: When a user clicks on the search button for a starts with search, and they selected an autosuggestion and change it and select another, an analytics click event will be fired.
		Given "dictionaryTitle" is set to "NCI Drug Dictionary"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsPublishedDate" is set to "02/02/2011"
		And "analyticsName" is set to "Drug"
		When the user visits the home page
		And search bar contains a placeholder text "Enter keywords or phrases"
		And user types "avas" in the search bar
		And browser waits
		And selects the "Avastin" entry
		And browser waits
		And user types "bev" in the search bar
		And browser waits
		And selects the "bevacizumab" entry
		And browser waits
		And the user clicks the search button
		Then there should be an analytics event with the following details
			| key                      | value                                 |
			| type                     | Other                                 |
			| event                    | DrugDictionaryApp:Other:KeywordSearch |
			| linkName                 | DrugDictionarySearch                  |
			| data.dictionaryTitle     | NCI Drug Dictionary                   |
			| data.analyticsName       | Drug                                  |
			| data.autosuggestUsage    | Selected                              |
			| data.searchTerm          | bevacizumab                           |
			| data.searchType          | starts with                           |
			| data.charactersTyped     | bev                                   |
			| data.termSelected        | bevacizumab                           |
			| data.numCharacters       | (int)3                                |
			| data.suggestItems        | (int)10                               |
			| data.numSuggestsSelected | (int)2                                |

	Scenario: When a user clicks on the search button for a starts with search, and they selected an autosuggestion and modified it, an analytics click event will be fired.
		Given "dictionaryTitle" is set to "NCI Drug Dictionary"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsPublishedDate" is set to "02/02/2011"
		And "analyticsName" is set to "Drug"
		When the user visits the home page
		And search bar contains a placeholder text "Enter keywords or phrases"
		And user types "bev" in the search bar
		And browser waits
		And selects the "bevacizumab" entry
		And the user edits the selected text to be "bevacizuma"
		And the user clicks the search button
		Then there should be an analytics event with the following details
			| key                      | value                                 |
			| type                     | Other                                 |
			| event                    | DrugDictionaryApp:Other:KeywordSearch |
			| linkName                 | DrugDictionarySearch                  |
			| data.dictionaryTitle     | NCI Drug Dictionary                   |
			| data.analyticsName       | Drug                                  |
			| data.autosuggestUsage    | Modified                              |
			| data.searchTerm          | bevacizuma                            |
			| data.searchType          | starts with                           |
			| data.charactersTyped     | bev                                   |
			| data.termSelected        | bevacizumab                           |
			| data.numCharacters       | (int)3                                |
			| data.suggestItems        | (int)10                               |
			| data.numSuggestsSelected | (int)1                                |
  ## NOTE: The numCharacters and suggestions are based on the initial selection

	Scenario: When a user clicks on the search button for a starts with search, and they selected an autosuggestion and modified it to something else, an analytics click event will be fired.
		Given "dictionaryTitle" is set to "NCI Drug Dictionary"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsPublishedDate" is set to "02/02/2011"
		And "analyticsName" is set to "Drug"
		When the user visits the home page
		And search bar contains a placeholder text "Enter keywords or phrases"
		And user types "bev" in the search bar
		And browser waits
		And selects the "bevacizumab" entry
		And the user edits the selected text to be "mab"
		And the user clicks the search button
		Then there should be an analytics event with the following details
			| key                      | value                                 |
			| type                     | Other                                 |
			| event                    | DrugDictionaryApp:Other:KeywordSearch |
			| linkName                 | DrugDictionarySearch                  |
			| data.dictionaryTitle     | NCI Drug Dictionary                   |
			| data.analyticsName       | Drug                                  |
			| data.autosuggestUsage    | Modified                              |
			| data.searchTerm          | mab                                   |
			| data.searchType          | starts with                           |
			| data.charactersTyped     | bev                                   |
			| data.termSelected        | bevacizumab                           |
			| data.numCharacters       | (int)3                                |
			| data.suggestItems        | (int)10                               |
			| data.numSuggestsSelected | (int)1                                |
  ## NOTE: The numCharacters and suggestions are based on the initial selection

	Scenario: When a user clicks on the search button for a starts with search, and they were offered autosuggestions but not selected, an analytics click event will be fired.
		Given "dictionaryTitle" is set to "NCI Drug Dictionary"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsPublishedDate" is set to "02/02/2011"
		And "analyticsName" is set to "Drug"
		When the user visits the home page
		And search bar contains a placeholder text "Enter keywords or phrases"
		And user types "bev" in the search bar
		And the user clicks the search button
		Then there should be an analytics event with the following details
			| key                      | value                                 |
			| type                     | Other                                 |
			| event                    | DrugDictionaryApp:Other:KeywordSearch |
			| linkName                 | DrugDictionarySearch                  |
			| data.dictionaryTitle     | NCI Drug Dictionary                   |
			| data.analyticsName       | Drug                                  |
			| data.autosuggestUsage    | Offered                               |
			| data.searchTerm          | bev                                   |
			| data.searchType          | starts with                           |
			| data.suggestItems        | (int)10                               |
			| data.numSuggestsSelected | (int)0                                |

	Scenario: When a user clicks on the search button for a starts with search, and they were NOT offered autosuggestions, an analytics click event will be fired.
		Given "dictionaryTitle" is set to "NCI Drug Dictionary"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsPublishedDate" is set to "02/02/2011"
		And "analyticsName" is set to "Drug"
		When the user visits the home page
		And search bar contains a placeholder text "Enter keywords or phrases"
		And user types "asd" in the search bar
		And browser waits
		And the user clicks the search button
		Then there should be an analytics event with the following details
			| key                      | value                                 |
			| type                     | Other                                 |
			| event                    | DrugDictionaryApp:Other:KeywordSearch |
			| linkName                 | DrugDictionarySearch                  |
			| data.dictionaryTitle     | NCI Drug Dictionary                   |
			| data.analyticsName       | Drug                                  |
			| data.autosuggestUsage    | NoneOffered                           |
			| data.searchTerm          | asd                                   |
			| data.searchType          | starts with                           |
			| data.suggestItems        | (int)0                                |
			| data.numSuggestsSelected | (int)0                                |
