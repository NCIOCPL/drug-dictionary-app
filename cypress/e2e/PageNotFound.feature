Feature: As a user, if I visit the definition page with a pretty url name that doesn't exist, I should be presented with a page indicating that my link could be bad

  Scenario: Page not found should be displayed when a user visits the definition page with a pretty url that doesn't exist
   When the user navigates to non-existent definition "def/chicken"
    And page title on error page is "Page Not Found"
    And the text "We can't find the page you're looking for." appears on the page
    And the link "homepage" to "https://www.cancer.gov" appears on the page
    And the link "cancer type" to "https://www.cancer.gov/types" appears on the page
    And the link "Get in touch" to "https://www.cancer.gov/contact" appears on the page
    And the search bar appear below
		And the page contains meta tags with the following names
			| name                  | content |
			| prerender-status-code | 404     |
