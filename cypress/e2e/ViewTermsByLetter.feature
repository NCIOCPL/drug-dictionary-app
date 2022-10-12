Feature: View Terms By Letter

	Scenario: User appends /expand to the URL and tries to access the dictionary
		Given the user navigates to "/expand"
		Then the system returns the no results found page

	Scenario: User navigates to /expand/] to the URL and tries to access the dictionary
		Given the user navigates to "/expand/]"
		Then the system returns the no matching results page

	Scenario: User selects a letter from A-Z list on dictionaries for terms in lists
		Given the user navigates to "/expand/B"
		When user selects letter "A" from A-Z list
		Then the system returns user to the search results page for the search term "A" URL has "/expand"
		Then search results page displays results title "# results found for: A"
		And each result in the results listing appears as a link to the term's page
		And each other name result is displayed with "(Other name for: [preferred_name])"
		And each result displays its full definition below the link for the term

	Scenario: Results /expand page metadata
		Given the user navigates to "/expand/A"
		Then the title tag should be "NCI Drug Dictionary - National Cancer Institute"
		And the page contains meta tags with the following properties
			| property | content                        |
			| og:title | NCI Drug Dictionary            |
			| og:url   | http://localhost:3000/expand/A |
			| robots   | noindex                        |
		And there is a canonical link with the href "https://www.cancer.gov/expand/A"

