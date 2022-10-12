Feature: Dictionary Landing Page

	Scenario: User is able to access a default (or "landing") page that displays all of the expected Dictionary elements for the drug dictionary.
        Given the user navigates to "/"
        And page title is "NCI Drug Dictionary"
        And introductory text appears below the page title
        And keywords search box appears
        Then search options for "Starts with" and "Contains" appears
        And "Starts with" radio is selected by default
        And "Browse:" appears with A-Z List of Links beside it
        And each option appears as a link
        Then search results page displays results title "# results found for: A"
        And the URL does not include "expand=A"



	Scenario: Landing page metadata
		Given the user navigates to "/"
		Then the title tag should be "NCI Drug Dictionary - National Cancer Institute"
		And the page contains meta tags with the following properties
			| property | content                |
			| og:title | NCI Drug Dictionary    |
			| og:url   | http://localhost:3000/ |
			| robots   | index                  |
		And there is a canonical link with the href "https://www.cancer.gov/"


#############Analytics################


Scenario: Page Load Analytics fires when a user views an expand result page
    Given "dictionaryTitle" is set to "NCI Drug Dictionary"
       And "baseHost" is set to "http://localhost:3000"
       And "canonicalHost" is set to "https://www.cancer.gov"
       And "siteName" is set to "National Cancer Institute"
       And "channel" is set to "Publications"
       And "analyticsPublishedDate" is set to "02/02/2011"
       And "analyticsName" is set to "Drug"
    When the user navigates to "/"
    Then search results page displays results title "# results found for: A"
    And browser waits
    Then there should be an analytics event with the following details
      | key                                    | value                                                      |
      | type                                   | PageLoad                                                   |
      | event                                  | DrugDictionaryApp:Load:ExpandResults                             |
      | page.name                              | www.cancer.gov/                                    |
      | page.title                             | NCI Drug Dictionary                                 |
      | page.metaTitle                         | NCI Drug Dictionary - National Cancer Institute |
      | page.language                          | english                                                    |
      | page.type                              | nciAppModulePage                                           |
      | page.channel                           | Publications                                               |
      | page.contentGroup                      | NCI Drug Dictionary                             |
      | page.publishedDate                     | 02/02/2011                                                 |
      | page.additionalDetails.dictionaryTitle | NCI Drug Dictionary                         |
      | page.additionalDetails.analyticsName   | Drug                                                |
      | page.additionalDetails.letter          | a                                                          |
      | page.additionalDetails.numberResults   | (int)1427                                                   |
