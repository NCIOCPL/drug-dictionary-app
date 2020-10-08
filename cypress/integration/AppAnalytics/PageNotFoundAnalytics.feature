Feature: Analytics Page Not Found
  Scenario: Page Load Analytics fires for a 404 on the terms page
    Given "dictionaryTitle" is set to "NCI Drug Dictionary"
    And "baseHost" is set to "http://localhost:3000"
    And "canonicalHost" is set to "https://www.cancer.gov"
    And "siteName" is set to "National Cancer Institute"
    And "channel" is set to "Publications"
    And "analyticsPublishedDate" is set to "02/02/2011"
    And "analyticsName" is set to "Drug"
    When the user navigates to non-existent definition "def/dsadasda"
    And page title on error page is "Page Not Found"
    And browser waits
    Then there should be an analytics event with the following details
      | key                                    | value                               |
      | type                                   | PageLoad                            |
      | event                                  | DrugDictionaryApp:Load:PageNotFound |
      | page.name                              | www.cancer.gov/def/dsadasda         |
      | page.title                             | Page Not Found                      |
      | page.metaTitle                         | Page Not Found                      |
      | page.language                          | english                             |
      | page.type                              | nciAppModulePage                    |
      | page.channel                           | Publications                        |
      | page.contentGroup                      | NCI Drug Dictionary                 |
      | page.publishedDate                     | 02/02/2011                          |
      | page.additionalDetails.dictionaryTitle | NCI Drug Dictionary                 |
      | page.additionalDetails.analyticsName   | Drug                                |
