Feature: As a user, I would like to view drug term information, so that I may be more informed about cancer drug related terms.

# Scenario: As a user, I would like to see term information when I am viewing a term page
#   Given "dynamicListingPageBase" is set to "https://www.cancer.gov/about-cancer/treatment/clinical-trials/intervention"
#      And "nciThesaurusConceptLinkPattern" is set to "https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&code=${CCODE}"
#   When the user navigates to "/def/tretinoin"
#   Then the page title is "tretinoin"
#     And the Patient Information link to "https://www.cancer.gov/about-cancer/treatment/drugs/bevacizumab" appears on the page
#     And the definition text "A recombinant humanized monoclonal antibody directed against the vascular endothelial growth factor (VEGF), a pro-angiogenic cytokine. Bevacizumab binds to VEGF and inhibits VEGF receptor binding, thereby preventing the growth and maintenance of tumor blood vessels. " appears on the page
#     And an active clinical trials link to "https://www.cancer.gov/about-cancer/treatment/clinical-trials/intervention/C2039" appears after the definition text 
#     And an NCI Thesaurus link to "https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&code=C2039" EVS appears after the clinical trials link     
#    And a table of other names, each row being a name type with names appears on the page.
#    And the search box and A-Z browse list appears below the table.