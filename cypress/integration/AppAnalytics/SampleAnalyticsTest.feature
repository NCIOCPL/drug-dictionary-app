Feature: Analytics Page Load
	Scenario: Page Load Analytics fires when home page is visited
		Given "title" is set to "NCI Drug Dictionary"
		And "language" is set to "en"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Publications"
		And "analyticsContentGroup" is set to "NCI Drug Dictionary"
		And "analyticsName" is set to "Drug"
		And "analyticsPublishedDate" is set to "02/02/2011"
		When the user navigates to "/"
		And the page title is "NCI Drug Dictionary"
		And browser waits
		Then there should be an analytics event with the following details
			| key                                    | value                                           |
			| type                                   | PageLoad                                        |
			| event                                  | DrugDictionaryApp:Load:Home                     |
			| page.name                              | www.cancer.gov/                                 |
			| page.title                             | NCI Drug Dictionary                             |
			| page.metaTitle                         | NCI Drug Dictionary - National Cancer Institute |
			| page.language                          | english                                         |
			| page.type                              | nciAppModulePage                                |
			| page.channel                           | Publications                                    |
			| page.contentGroup                      | NCI Drug Dictionary                             |
			| page.publishedDate                     | 02/02/2011                                      |
			| page.additionalDetails.analyticsName   | Drug                                            |
			| page.additionalDetails.dictionaryTitle | NCI Drug Dictionary                             |

