/// <reference types="Cypress" />
import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
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

And('introductory text appears below the page title', () => {
	cy.get('h1').siblings('p').should('be.visible');
});

Given('screen breakpoint is set to {string}', (screenSize) => {
	if (screenSize === 'desktop') cy.viewport(1025, 600);
	else if (screenSize === 'mobile') cy.viewport(600, 800);
	else if (screenSize === 'tablet') cy.viewport(800, 900);
});

/*
    --------------------
        Page Visits
    --------------------
*/
Given('the user visits the home page', () => {
	cy.visit('/');
});

Given('user is on the dictionary landing page or results page', () => {
	// This destination will be changed to "baseURL" once the landing page is built
	cy.visit('/expand/B');
});

Given('the user navigates to {string}', (destURL) => {
	cy.visit(destURL);
});

Given('user is viewing the no results found page on any site', () => {
	cy.visit('/?swKeyword=achoo');
});

Given(
	'the user is viewing a results page based on clicking a letter like {string} in the dictionary',
	(letter) => {
		cy.visit(`/expand/${letter}`);
	}
);

When('the user clicks on the result for {string}', (link) => {
	cy.get(`dfn a`).contains(link).trigger('click', { followRedirect: false });
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

Then(
	'the system returns user to the search results page for the search term {string} URL has {string}',
	(term, destURL) => {
		cy.location('href').should('eq', `${baseURL}${destURL}/${term}`);
	}
);

And('the URL does not include {string}', (parameter) => {
	cy.url().should('not.contain', parameter);
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
	cy.get('h1').should('contain', 'Page Not Found');
});

/*
    -------------------------------
        No Matching Results Page
    -------------------------------
*/
And('the system returns the no matching results page', () => {
	cy.get('p').should(
		'contain',
		'No matches were found for the word or phrase you entered. Please check your spelling, and try searching again. You can also type the first few letters of your word or phrase, or click a letter in the alphabet and browse through the list of terms that begin with that letter.'
	);
});
//the system returns the no matching results page

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
	cy.get('.menu-wrapper div div').should('have.text', helperText);
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
		cy.get(".menu-wrapper div[class*='--terms']").should('be.visible');
		const regex = new RegExp(
			keyword.replace(/[-[\]{}()*+!<=:?.\\^$|#\s,]/g, '\\$&'),
			'i'
		);
		cy.get(".menu-wrapper div[class*='--terms'] span strong").each(($el) => {
			cy.wrap($el).invoke('text').should('match', regex);
		});
	}
);

When('user selects letter {string} from A-Z list', (letter) => {
	cy.get(`nav[data-testid='tid-az-list'] > ul > li a`).contains(letter).click();
});

Then(
	'search results page displays results title {string}',
	(searchResultsTitle) => {
		// Strip # char from searchResultsTitle string
		const titleWithoutResultsCount = searchResultsTitle.substring(1);
		cy.get('h4').contains(titleWithoutResultsCount);
	}
);

And('the user clicks the search button', () => {
	cy.get('input#btnSearch').click({ force: true });
});

And('there should be no {string} table in the document', (string) => {
	cy.get(string).should('not.exist');
});

Then('autosuggest appears with correct options', (dataTable) => {
	let allOptions;
	cy.document().then((document) => {
		allOptions = document.querySelectorAll('.menu-wrapper div[class*="-item"]');
		let i = 0;
		for (const { options } of dataTable.hashes()) {
			expect(allOptions[i]).to.have.text(options);
			i++;
		}
	});
});

/*
    -----------------------
        Search box
    -----------------------
*/

And('the {string} link does not appear on the page', (string) => {
	cy.get(string).should('not.exist');
});
And(
	'the {string} link to {string} appears on the page',
	(title, patientInfoLink) => {
		cy.get('a.dictionary-definiton__patient-information-button').should(
			'have.attr',
			'href',
			patientInfoLink
		);
		cy.get('a.dictionary-definiton__patient-information-button').should(
			'contain',
			title
		);
	}
);
And('the link to Patient Information does not appear on the page', () => {
	cy.get('a.dictionary-definiton__patient-information-button').should(
		'not.exist'
	);
});
And('the definition text {string} appears on the page', (defText) => {
	cy.get('div.dictionary-definiton__definition').should('contain', defText);
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

When('user clicks on {string} button', (PtInfoButton) => {
	cy.get('a')
		.contains(PtInfoButton)
		.trigger('click', { followRedirect: false });
});

/*
    ------------------
        Term List
    ------------------
*/

And(
	"each result in the results listing appears as a link to the term's page",
	() => {
		cy.get('dt:first > dfn > a')
			.should('have.attr', 'href')
			.and('to.contain', '/def');
	}
);

And(
	'each result displays its full definition below the link for the term',
	() => {
		expect(cy.get('dl > dd')).to.not.be.empty;
	}
);

And(
	'each other name result is displayed with {string}',
	(alternateDisplayText) => {
		const alternateDisplayTextOther = alternateDisplayText.substring(0, 15);
		cy.get('dl > dd').should('to.contain', alternateDisplayTextOther);
	}
);
/*
    ------------------
        Results List
    ------------------
*/
And('page displays {int} results found for {string}', (number, drug) => {
	const alternateDisplayTextOther = drug.substring(0, 15);
	cy.get('h4').should('to.contain', alternateDisplayTextOther);
	cy.get('h4').should('to.contain', number);
});
/*
    ------------------
        Page Not Found
    ------------------
*/
When('the user navigates to non-existent definition {string}', (def) => {
	Cypress.on('uncaught:exception', (err, runnable) => {
		// returning false here to Cypress from
		// failing the test
		return false;
	});
	cy.visit(def);
});

Then('page title on error page is {string}', (title) => {
	Cypress.on('uncaught:exception', (err, runnable) => {
		// returning false here to Cypress from
		// failing the test
		return false;
	});
	cy.get('h1').should('contain', title);
});

And('the text {string} appears on the page', (text) => {
	cy.get('div.error-container').should('contain', text);
});

And(
	'the link {string} to {string} appears on the page',
	(linkText, linkHref) => {
		cy.get(`a[href="${linkHref}"]`).should('have.text', linkText);
	}
);

And('the search bar appear below', () => {
	cy.get('input#keywords').should('be.visible');
});

/*
    ------------------
        Search Results
    ------------------
*/

When('user types {string} in the search box', (keyword) => {
	cy.get('#keywords').type(keyword);
});

And('user clicks search button', () => {
	cy.get('#btnSearch').click({ force: true });
});

And(
	"each result in the results listing displays the folowing preferred names as a link to the term's page",
	(dataTable) => {
		cy.document().then((document) => {
			const titleLinks = document.querySelectorAll('.results dfn a');
			let i = 0;
			for (const { preferredName } of dataTable.hashes()) {
				expect(titleLinks[i]).has.attr('href');
				expect(titleLinks[i]).to.have.text(preferredName);
				i++;
			}
		});
	}
);

And('the preferred name is followed by the alternate names', (dataTable) => {
	for (const {
		resultIndex,
		altNameIndex,
		alternateName,
	} of dataTable.hashes()) {
		cy.get('.results dfn')
			.eq(resultIndex - 1)
			.find('ul li')
			.eq(altNameIndex)
			.should('have.text', alternateName);
	}
});

Then('the system returns search results page for the search term', () => {
	cy.location('pathname').should('include', '/search');
});

Given('the user navigates to bad search url {string}', (path) => {
	Cypress.on('uncaught:exception', (err, runnable) => {
		// returning false here to Cypress from
		// failing the test
		return false;
	});
	cy.visit(path);
});

When('the user clicks on the result for {string}', (result) => {
	cy.get('.results dfn a')
		.contains(result)
		.trigger('click', { followRedirect: false });
});

Then('user is redirected to {string}', (path) => {
	cy.location('pathname').should('be.eq', path);
});

Then('the search bar on the page does not maintain the user’s term', () => {
	cy.get('#keywords').should('have.attr', 'value', '');
});

Then('the message {string} appears',(text)=>{
cy.get('.limited-query-message').should('have.text',text);
});
