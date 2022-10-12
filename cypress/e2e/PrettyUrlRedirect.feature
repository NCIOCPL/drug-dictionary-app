Feature: As the website, I should redirect CDR IDs in URLs to its counterpart pretty URL for better findability

    Scenario: Redirect from CDR ID
        Given the user navigates to "/def/750633"
        Then the system redirects user to "/def/acenocoumarol"
        And the system appends "?redirect=true" to the URL
