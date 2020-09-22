/// <reference types="Cypress" />
import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { i18n } from '../../../src/utils';

const baseURL = Cypress.config('baseUrl');

Then('page title is {string}', (title) => {
	cy.get('h1').should('contain', title);
});

Then('the page title is {string}', (title) => {
	cy.get('h1').should('contain', title);
});

Then('page title on error page is {string}', (title) => {
	Cypress.on('uncaught:exception', (err, runnable) => {
		// returning false here to Cypress from
		// failing the test
		return false;
	});
	cy.get('h1').should('contain', title);
});

/*
    --------------------
        Page Visits
    --------------------
*/
Given('the user visits the home page', () => {
	cy.visit('/');
});

Given('the user navigates to {string}', (destURL) => {
	cy.visit(destURL);
});

Given('user is viewing the no results found page on any site', () => {
	cy.visit('/?swKeyword=achoo');
});

Given('{string} is set to {string}', (key, param) => {
	cy.on('window:before:load', (win) => {
		win.INT_TEST_APP_PARAMS[key] = param;
	});
});

Then('the system redirects user to {string}', (path) => {
	cy.location('pathname').should('eq', path);
});
And('the system appends {string} to the URL', (queryParam) => {
	cy.location('search').should('eq', queryParam);
});
/*
    ----------------------------------------
      API Error Page
    ----------------------------------------
*/
Then('the user gets an error page that reads {string}', (errorMessage) => {
	Cypress.on('uncaught:exception', (err, runnable) => {
		// returning false here to Cypress from
		// failing the test
		return false;
	});
	cy.get('.error-container h1').should('have.text', errorMessage);
});

And('the page displays {string}', (text) => {
	cy.get('#NCI-app-root').contains(text);
});

/*
    ----------------------------------------
     Analytics
    ----------------------------------------
*/
Then('browser waits', () => {
	cy.wait(2000);
});

And('the following links and texts exist on the page', (dataTable) => {
	// Split the data table into array of pairs
	const rawTable = dataTable.rawTable.slice();

	// Verify the total number of links
	cy.document().then((doc) => {
		let docLinkArray = doc.querySelectorAll('#main-content a');
		expect(docLinkArray.length).to.be.eq(rawTable.length);
	});

	// get the link with the provided url and assert it's text
	for (let i = 0; i < rawTable.length; i++) {
		const row = rawTable[i];
		cy.get(`#main-content a[href='${row[0]}']`).should('have.text', row[1]);
	}
});

/*
    -----------------------
        No Results Page
    -----------------------
*/
And('the system returns the no results found page', () => {
	cy.window().then((win) => {
		if (win.INT_TEST_APP_PARAMS) {
			const noResultsPageTitle =
				i18n.nciSearchResults[win.INT_TEST_APP_PARAMS.language];
			cy.get('h1').should('contain', noResultsPageTitle);
		}
	});
});

/*
    -----------------------
        Search box
    -----------------------
*/

Then('heading {string} appears', (searchBoxTitle) => {
	cy.get('h6').should('have.text', searchBoxTitle);
});
Then(
	'search options for {string} and {string} appears',
	(startWith, contain) => {
		cy.get('div.radio-selection label').first().should('have.text', startWith);
		cy.get('div.radio-selection label').last().should('have.text', contain);
	}
);

And('{string} radio is selected by default', (startWith) => {
	cy.get(`input[value="Begins"]`).should('be.checked');
});

And('keywords search box appears', () => {
	cy.get('div#keywords-autocomplete-wrapper').should('be.visible');
});
And('search button appears beside search box with {string}', (search) => {
	cy.get('#btnSearch').should('be.visible').and('have.value', search);
});
And('{string} appears with A-Z List of Links beside it', (browseLabel) => {
	// Browse label shows
	cy.get(`nav[data-testid='tid-az-list']`).contains(browseLabel);
	// A-Z nav list is rendered with 27 items
	cy.get(`nav[data-testid='tid-az-list'] > ul > li`).should('have.length', 27);
});

And('each option appears as a link', () => {
	cy.get(`nav[data-testid='tid-az-list'] > ul > li > a`).each(($link) => {
		cy.wrap($link).should('have.attr', 'href').and('to.contain', '/expand');
	});
});

And('search bar contains a placeholder text {string}', (placeholder) => {
	cy.get('input#keywords').should('have.attr', 'placeholder', placeholder);
});

When('user clicks on the search bar', () => {
	cy.get('input#keywords').click();
});
Then('helper text {string} appears', (helperText) => {
	cy.get('.menu-anchor div div').should('have.text', helperText);
});

When('user types {string} in the search bar', (keyword) => {
	cy.get('input#keywords').type(keyword);
});

When('user selects {string} option', (searchType) => {
	const selectedOption = searchType === 'Contains' ? 'contains' : 'starts-with';
	cy.get(`.ncids-radio__label[for="${selectedOption}"]`).click();
});

Then(
	'autosuggest appears with highlighting of the text {string}',
	(keyword) => {
		cy.get(".menu-anchor div[class*='--terms']").should('be.visible');
		const regex = new RegExp(
			keyword.replace(/[-[\]{}()*+!<=:?.\\^$|#\s,]/g, '\\$&'),
			'i'
		);
		cy.get(".menu-anchor div[class*='--terms'] span strong").each(($el) => {
			cy.wrap($el).invoke('text').should('match', regex);
		});
	}
);

When('user selects letter {string} from A-Z list', (letter) => {
	cy.get(`nav[data-testid='tid-az-list'] > ul > li a`).contains(letter).click();
});

And('the user clicks the search button', () => {
	cy.get('input#btnSearch').click({ force: true });
});

And('there should be no {string} table in the document', (string) => {
	cy.get(string).should('not.exist');
});

/*
    -----------------------
        Search box
    -----------------------
*/

And(
	'the {string} link to {string} appears on the page',
	(title, patientInfoLink) => {
		cy.get('a.patient-information-button').should(
			'have.attr',
			'href',
			patientInfoLink
		);
		cy.get('a.patient-information-button').should('contain', title);
	}
);
And('the link to Patient Information does not appear on the page', () => {
	cy.get('a.patient-information-button').should('not.exist');
});
And('the definition text {string} appears on the page', (defText) => {
	cy.get('div.definition').should('contain', defText);
});

And('an {string} link to {string}', (linkText, linkHref) => {
	cy.get(`a[href="${linkHref}"]`).should('have.text', linkText);
});

And('a table of other names includes the following', (dataTable) => {
	let allNames;
	cy.document().then((document) => {
		allNames = document.querySelectorAll('tbody tr th b');
		//assert that there are no extra names displayed in the table
		expect(allNames.length).to.eq(dataTable.hashes().length);
		let i = 0;
		for (const { nameType } of dataTable.hashes()) {
			//assert that every expected name is displayed in order
			expect(allNames[i].textContent).to.eq(nameType);
			i++;
		}
	});
});

Then(
	"there should be a {string} attribute on the definition's title element",
	(cdrId) => {
		cy.get('h1').should('have.attr', cdrId);
	}
);
