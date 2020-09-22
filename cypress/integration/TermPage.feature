Feature: Term page



    Scenario: As a user, I would like to see an option to search when I am viewing the definition for a term, term info and the patient information link for a term
        Given the user navigates to "def/bevacizumab"
        Then the page title is "bevacizumab"
        And the "View Patient Information" link to "https://www.cancer.gov/about-cancer/treatment/drugs/bevacizumab" appears on the page
        And the definition text "A recombinant humanized monoclonal antibody directed against the vascular endothelial growth factor (VEGF), a pro-angiogenic cytokine.  Bevacizumab binds to VEGF and inhibits VEGF receptor binding, thereby preventing the growth and maintenance of tumor blood vessels." appears on the page
        #And an "active clinical trials" link to "https://www.cancer.gov/about-cancer/treatment/clinical-trials/intervention/C2039"
        #And an "NCI Thesaurus" link to "https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&code=C2039"
        And a table of other names includes the following
            | nameType       |
            | Synonym:       |
            | US brand name: |
            | Abbreviation:  |
            | Code name:     |
            | IND number:    |
            | NSC code:      |

    Scenario: As a user, I see the definition of term I am viewing and the search option, but do not see the Patient Information Link when it is not provided
        Given the user navigates to "def/tretinoin"
        Then the page title is "tretinoin"
        Then the link to Patient Information does not appear on the page
        And the definition text "A naturally-occurring acid of retinol. Tretinoin binds to and activates retinoic acid receptors (RARs), thereby inducing changes in gene expression that lead to cell differentiation, decreased cell proliferation, and inhibition of tumorigenesis.  This agent also inhibits telomerase, resulting in telomere shortening and eventual apoptosis of some tumor cell types.  The oral form of tretinoin has teratogenic and embryotoxic properties." appears on the page
        #And an "active clinical trials" link to "https://www.cancer.gov/about-cancer/treatment/clinical-trials/intervention/C900"
        #And an "NCI Thesaurus" link to "https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&code=C900"
        And a table of other names includes the following
            | nameType            |
            | Synonym:            |
            | US brand name:      |
            | Foreign brand name: |
            | Abbreviation:       |
            | Acronym:            |
            | Code name:          |
            | Chemical structure: |
            | IND number:         |
            | NSC code:           |

    Scenario: As a user, using the termId, I see the definition of term I am viewing and the search option
        Given the user navigates to "def/750633"
        Then the page title is "acenocoumarol"
        And the link to Patient Information does not appear on the page
        And the definition text "A 4-hydroxycoumarin derivative with anticoagulant activity. As a vitamin K antagonist, acenocoumarol inhibits vitamin K epoxide reductase, thereby inhibiting the reduction of vitamin K and the availability of vitamin KH2. This prevents gamma carboxylation of glutamic acid residues near the N-terminals of the vitamin K-dependent clotting factors, including factor II, VII, IX, and X and anticoagulant proteins C and S. This prevents their activity and thus thrombin formation. Compared to other coumarin derivatives, acenocoumarol has a short half-life." appears on the page
        #And an "active clinical trials" link to "https://www.cancer.gov/about-cancer/treatment/clinical-trials/intervention/801361"
        #And an "NCI Thesaurus" link to "https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&code=801361"
        And there should be no "synonym" table in the document



    Scenario: As a user, I see the definition of term I am viewing and the search option, but do not see the Synonyms Table when it is not provided
        Given the user navigates to "def/xenogeneic-tyrosinase-dna-vaccine"
        Then the page title is "xenogeneic tyrosinase DNA vaccine"
        And there should be no "synonym" table in the document

    Scenario: As a CDR manager, I would like to be able to find the CDRID of a definition on the definition page so that I can quickly locate the definition within the CDR system.
        Given the user navigates to "def/bevacizumab"
        Then there should be a "data-cdr-id" attribute on the definition's title element

    Scenario: Term page metadata
        Given the user navigates to "def/bevacizumab"
        Then the title tag should be "NCI Drug Dictionary - National Cancer Institute"
        And the page contains meta tags with the following properties
            | property | content                               |
            | og:title | NCI Drug Dictionary                   |
            | og:url   | http://localhost:3000/def/bevacizumab |
            | robots   | noindex                               |
        And there is a canonical link with the href "https://www.cancer.gov/def/bevacizumab"

    Scenario: Page Load Analytics fires when a user visits a term page.
        Given "dictionaryTitle" is set to "NCI Drug Dictionary"
        And "baseHost" is set to "http://localhost:3000"
        And "canonicalHost" is set to "https://www.cancer.gov"
        And "siteName" is set to "National Cancer Institute"
        And "channel" is set to "Publications"
        And "analyticsPublishedDate" is set to "02/02/2011"
        And "analyticsName" is set to "Drug"
        And "analyticsContentGroup" is set to "NCI Drug Dictionary"
        Given the user navigates to "def/bevacizumab"
        And the page title is "bevacizumab"
        And browser waits
        Then there should be an analytics event with the following details
            | key                                    | value                                                                       |
            | type                                   | PageLoad                                                                    |
            | event                                  | DrugDictionaryApp:Load:Definition                                           |
            | page.name                              | www.cancer.gov/def/bevacizumab                                              |
            | page.title                             | NCI Drug Dictionary                                                         |
            | page.metaTitle                         | Definition of bevacizumab - NCI Drug Dictionary - National Cancer Institute |
            | page.language                          | english                                                                     |
            | page.type                              | nciAppModulePage                                                            |
            | page.channel                           | Publications                                                                |
            | page.contentGroup                      | NCI Drug Dictionary                                                         |
            | page.publishedDate                     | 02/02/2011                                                                  |
            | page.additionalDetails.dictionaryTitle | NCI Drug Dictionary                                                         |
            | page.additionalDetails.analyticsName   | Drug                                                                        |
            | page.additionalDetails.term            | bevacizumab                                                                 |
            | page.additionalDetails.id              | (int)43234                                                                  |
