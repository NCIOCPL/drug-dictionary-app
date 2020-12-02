Feature: View Terms By Letter Analytics

	########## Analytics ############

	Scenario: Page Load Analytics fires when a user views an expand result page
		Given "dictionaryTitle" is set to "NCI Drug Dictionary"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsPublishedDate" is set to "02/02/2011"
		And "analyticsName" is set to "Drug"
		When the user is viewing a results page based on clicking a letter like "M" in the dictionary
		Then search results page displays results title "# results found for: M"
		And browser waits
		Then there should be an analytics event with the following details
			| key                                    | value                                           |
			| type                                   | PageLoad                                        |
			| event                                  | DrugDictionaryApp:Load:ExpandResults            |
			| page.name                              | www.cancer.gov/expand/M                         |
			| page.title                             | NCI Drug Dictionary                             |
			| page.metaTitle                         | NCI Drug Dictionary - National Cancer Institute |
			| page.language                          | english                                         |
			| page.type                              | nciAppModulePage                                |
			| page.channel                           | Publications                                    |
			| page.contentGroup                      | NCI Drug Dictionary                             |
			| page.publishedDate                     | 02/02/2011                                      |
			| page.additionalDetails.dictionaryTitle | NCI Drug Dictionary                             |
			| page.additionalDetails.analyticsName   | Drug                                            |
			| page.additionalDetails.letter          | M                                               |
			| page.additionalDetails.numberResults   | (int)468											                   |



	Scenario: User Clicks on an Expand Listing Item (i.e. a result)
		Given "dictionaryTitle" is set to "NCI Drug Dictionary"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsPublishedDate" is set to "02/02/2011"
		And "analyticsName" is set to "Drug"
		And the user is viewing a results page based on clicking a letter like "M" in the dictionary
		And search results page displays results title "# results found for: M"
		When the user clicks on the result for "macimorelin"
		Then there should be an analytics event with the following details
			| key                  | value                               |
			| type                 | Other                               |
			| event                | DrugDictionaryApp:Other:ResultClick |
			| linkName             | DrugDictionaryResults               |
			| data.dictionaryTitle | NCI Drug Dictionary                 |
			| data.analyticsName   | Drug                                |
			| data.resultIndex     | (int)5                              |
			| data.resultIdOrName  | macimorelin                         |
			| data.resultName      | macimorelin                         |


	Scenario: User Clicks on an Expand Listing Item without a prettyurl name (i.e. a result)
		Given "dictionaryTitle" is set to "NCI Drug Dictionary"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsPublishedDate" is set to "02/02/2011"
		And "analyticsName" is set to "Drug"
		And the user is viewing a results page based on clicking a letter like "E" in the dictionary
		And search results page displays results title "# results found for: E"
		When the user clicks on the result for "expanded cord blood stem cells mixed with engineered human endothelial cells AB-110"
		Then there should be an analytics event with the following details
			| key                  | value                                                                               |
			| type                 | Other                                                                               |
			| event                | DrugDictionaryApp:Other:ResultClick                                                 |
			| linkName             | DrugDictionaryResults                                                               |
			| data.dictionaryTitle | NCI Drug Dictionary                                                                 |
			| data.analyticsName   | Drug                                                                                |
			| data.resultIndex     | (int)296                                                                            |
			| data.resultIdOrName  | (int)795426                                                                         |
			| data.resultName      | expanded cord blood stem cells mixed with engineered human endothelial cells AB-110 |
