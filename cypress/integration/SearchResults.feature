Feature: As a user, I would like to be able to enter keywords and have the option to submit a search

  Scenario: User enters /search in the URL and tries to access the dictionary
    Given the user navigates to bad search url "/search"
    Then the system returns the no matching results page


  Scenario: User is able to enter keywords for a search with 'Starts With'
    Given the user navigates to "/"
    Then keywords search box appears
    And "Starts with" radio is selected by default
    And search bar contains a placeholder text "Enter keywords or phrases"
    And search button appears beside search box with "Search"
    When user types "gle" in the search box
    And user clicks search button
    Then the system returns search results page for the search term
    Then search results page displays results title "# results found for: gle"
    And each result in the results listing displays the folowing preferred names as a link to the term's page
      | preferredName            |
      | glecaprevir/pibrentasvir |
      | glembatumumab vedotin    |
      | glesatinib               |
      | imatinib mesylate        |
      | lomustine                |
    And the preferred name is followed by the alternate names
      | resultIndex | altNameIndex | alternateName                |
      | 1           | 1            | glecaprevir and pibrentasvir |
      | 1           | 2            | glecaprevir-pibrentasvir     |
      | 1           | 3            | GLE/PIB                      |
    And each result displays its full definition below the link for the term

  Scenario: User is able to enter keywords for a search with 'Contains'
    Given the user navigates to "/"
    When user selects "Contains" option
    And user types "2/3" in the search box
    And user clicks search button
    Then the system returns search results page for the search term
    Then search results page displays results title "# results found for: 2/3"
    And each result in the results listing displays the folowing preferred names as a link to the term's page
      | preferredName                            |
      | anti-HER2/HER3 dendritic cell vaccine    |
      | BET bromodomains 2/3/4 inhibitor MK-8628 |
      | FGFR inhibitor1/2/3 HMPL-453             |
      | fruquintinib                             |
      | HAAH lambda phage vaccine SNS-301        |
    And the preferred name is followed by the alternate names
      | resultIndex | altNameIndex | alternateName                  |
      | 4           | 1            | VEGFR-1/2/3 inhibitor HMPL-013 |
      | 2           | 1            | BRD 2/3/4 inhibitor MK-8628    |
      | 1           | 3            | anti-HER2/3 DC vaccine         |
    And each result displays its full definition below the link for the term



  Scenario Outline: User is able to enter edge case keywords on mobile and tablet and search is executed
    Given screen breakpoint is set to "<screen>"
    And the user navigates to "/"
    When user selects "<matchType>" option
    And user types "<keyword>" in the search box
    And user clicks search button
    Then the system returns search results page for the search term
    And each result displays its full definition below the link for the term

    Examples:
      | matchType   | keyword | screen |
      | Starts With | bin     | tablet |

  Scenario: Negative: User enters a keyword or phrase that does not generate any matches
    Given the user navigates to "/"
    And user types "fg!" in the search box
    And user clicks search button
    Then the system returns the no matching results page

  Scenario: Search page metadata
    Given the user navigates to "/search/bevacizumab/?searchMode=Begins"
    Then the title tag should be "NCI Drug Dictionary - National Cancer Institute"
    And the page contains meta tags with the following properties
      | property | content                                  |
      | og:title | NCI Drug Dictionary                      |
      | og:url   | http://localhost:3000/search/bevacizumab |
      | robots   | noindex                                  |
    And there is a canonical link with the href "https://www.cancer.gov/search/bevacizumab"

  Scenario: As a user, if my search term only returns one result, I would like to be redirected to the term’s page instead of the results page.
    Given the user navigates to "/"
    And user types "50%" in the search box
    And user clicks search button
    Then user is redirected to "/def/50pct-oxygen-50pct-nitrous-oxide-premix"
    And the search bar on the page does not maintain the user’s term
    And "Starts with" radio is selected by default

  Scenario: As a user, if my search term only returns one result, I would like to be redirected to the term’s page instead of the results page.
    Given the user navigates to "/search/avastin/?searchMode=Begins"
    Then user is redirected to "/def/bevacizumab"
    And the search bar on the page does not maintain the user’s term
    And "Starts with" radio is selected by default

  Scenario: User is able to search for a term from PageNotFound page
    Given the user navigates to "/def/chicken"
    When user types "beva" in the search box
    And user clicks search button
    Then user is redirected to "/search/beva/"
    And the system appends "?searchMode=Begins" to the URL

  Scenario: User is able to search for a term longer than 30 characters
    Given the user navigates to "/search/allogeneic%20GM-CSF-secreting%20breast%20cancer%20vaccine%20/?searchMode=Contains"
    Then the system returns search results page for the search term
    And the message "Queries are limited to 30 characters. Any characters after the 30th will not be included in the search." appears
