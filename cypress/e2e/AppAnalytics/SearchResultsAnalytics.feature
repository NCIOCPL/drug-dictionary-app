Feature: Analytics Search Results


    Scenario: Page Load Analytics fires when a user views a "starts with" search result page
        Given "dictionaryTitle" is set to "NCI Drug Dictionary"
        And "baseHost" is set to "http://localhost:3000"
        And "canonicalHost" is set to "https://www.cancer.gov"
        And "siteName" is set to "National Cancer Institute"
        And "channel" is set to "Publications"
        And "analyticsPublishedDate" is set to "02/02/2011"
        And "analyticsName" is set to "Drug"
        When the user navigates to "/search/bev/?searchMode=Begins"
        And search results page displays results title "# results found for: bev"
        And browser waits
        Then there should be an analytics event with the following details
            | key                                    | value                                           |
            | type                                   | PageLoad                                        |
            | event                                  | DrugDictionaryApp:Load:SearchResults            |
            | page.name                              | www.cancer.gov/search/bev                       |
            | page.title                             | NCI Drug Dictionary                             |
            | page.metaTitle                         | NCI Drug Dictionary - National Cancer Institute |
            | page.language                          | english                                         |
            | page.type                              | nciAppModulePage                                |
            | page.channel                           | Publications                                    |
            | page.contentGroup                      | NCI Drug Dictionary                             |
            | page.publishedDate                     | 02/02/2011                                      |
            | page.additionalDetails.numberResults   | (int)9                                          |
            | page.additionalDetails.searchKeyword   | bev                                             |
            | page.additionalDetails.searchType      | StartsWith                                      |
            | page.additionalDetails.analyticsName   | Drug                                            |
            | page.additionalDetails.dictionaryTitle | NCI Drug Dictionary                             |

    Scenario: Page Load Analytics fires when a user views a "contains" search result page
        Given "dictionaryTitle" is set to "NCI Drug Dictionary"
        And "baseHost" is set to "http://localhost:3000"
        And "canonicalHost" is set to "https://www.cancer.gov"
        And "siteName" is set to "National Cancer Institute"
        And "channel" is set to "Publications"
        And "analyticsPublishedDate" is set to "02/02/2011"
        And "analyticsName" is set to "Drug"
        When the user navigates to "/search/beva/?searchMode=Contains"
        And search results page displays results title "# results found for: beva"
        And browser waits
        Then there should be an analytics event with the following details
            | key                                    | value                                           |
            | type                                   | PageLoad                                        |
            | event                                  | DrugDictionaryApp:Load:SearchResults            |
            | page.name                              | www.cancer.gov/search/beva                      |
            | page.title                             | NCI Drug Dictionary                             |
            | page.metaTitle                         | NCI Drug Dictionary - National Cancer Institute |
            | page.language                          | english                                         |
            | page.type                              | nciAppModulePage                                |
            | page.channel                           | Publications                                    |
            | page.contentGroup                      | NCI Drug Dictionary                             |
            | page.publishedDate                     | 02/02/2011                                      |
            | page.additionalDetails.numberResults   | (int)6                                          |
            | page.additionalDetails.searchKeyword   | beva                                            |
            | page.additionalDetails.searchType      | Contains                                        |
            | page.additionalDetails.analyticsName   | Drug                                            |
            | page.additionalDetails.dictionaryTitle | NCI Drug Dictionary                             |

    Scenario: User Clicks on a search result with pretty url
        Given "dictionaryTitle" is set to "NCI Drug Dictionary"
        And "baseHost" is set to "http://localhost:3000"
        And "canonicalHost" is set to "https://www.cancer.gov"
        And "siteName" is set to "National Cancer Institute"
        And "channel" is set to "Publications"
        And "analyticsPublishedDate" is set to "02/02/2011"
        And "analyticsName" is set to "Drug"
        When the user navigates to "/search/macro/?searchMode=Begins"
        And search results page displays results title "# results found for: macro"
        And browser waits
        When the user clicks on the result for "macrogol 3350-based oral osmotic laxative"
        Then there should be an analytics event with the following details
            | key                  | value                                     |
            | type                 | Other                                     |
            | event                | DrugDictionaryApp:Other:ResultClick       |
            | linkName             | DrugDictionaryResults                     |
            | data.dictionaryTitle | NCI Drug Dictionary                       |
            | data.analyticsName   | Drug                                      |
            | data.resultIndex     | (int)2                                    |
            | data.resultIdOrName  | macrogol-3350-based-iso-osmotic-laxative  |
            | data.resultName      | macrogol 3350-based oral osmotic laxative |

    Scenario: User Clicks on a search result with no pretty url
        Given "dictionaryTitle" is set to "NCI Drug Dictionary"
        And "baseHost" is set to "http://localhost:3000"
        And "canonicalHost" is set to "https://www.cancer.gov"
        And "siteName" is set to "National Cancer Institute"
        And "channel" is set to "Publications"
        And "analyticsPublishedDate" is set to "02/02/2011"
        And "analyticsName" is set to "Drug"
        When the user navigates to "/search/macro/?searchMode=Begins"
        And search results page displays results title "# results found for: macro"
        And browser waits
        When the user clicks on the result for "PEG4000/simethicone/sodium sulphate/sodium bicarbonate/electrolytes oral solution"
        Then there should be an analytics event with the following details
            | key                  | value                                                                             |
            | type                 | Other                                                                             |
            | event                | DrugDictionaryApp:Other:ResultClick                                               |
            | linkName             | DrugDictionaryResults                                                             |
            | data.dictionaryTitle | NCI Drug Dictionary                                                               |
            | data.analyticsName   | Drug                                                                              |
            | data.resultIndex     | (int)3                                                                            |
            | data.resultIdOrName  | (int)797373                                                                       |
            | data.resultName      | PEG4000/simethicone/sodium sulphate/sodium bicarbonate/electrolytes oral solution |
            