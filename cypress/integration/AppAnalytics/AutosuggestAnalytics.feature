Feature: Analytics Autosuggest

	Scenario: User selects a suggestions from the Autosuggest
		Given the user visits the home page
		When user types "beva" in the search bar
		And selects the "bevacizumab" entry
		And browser waits
		Then there should be an analytics event with the following details
			| key                  | value                                     |
			| type                 | Other                                     |
			| event                | DrugDictionaryApp:Other:AutosuggestSelect |
			| linkName             | DrugDictionaryResults                     |
			| data.dictionaryTitle | NCI Drug Dictionary                       |
			| data.analyticsName   | Drug                                      |
			| data.charactersTyped | beva                                      |
			| data.termSelected    | bevacizumab                               |
			| data.numCharacters   | (int)4                                    |
  # NOTE: This should be what is CURRENTLY selected. page.additionalDetail will have what was selected as part
  # of the original page/view request.
			| data.searchType   | starts with |
			| data.suggestItems | (int)10     |

