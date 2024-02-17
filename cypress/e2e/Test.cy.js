/// <referencetypes="Cypress" />


describe('TestSuite', () => 
{
    it('MyFirst Testcase',() => {
      describe('Image search', () => {
        beforeEach(() => {
          cy.visit('/');
          cy.get('[data-testid="search-input"]').as('searchInput');
          cy.get('[data-test-id="image-gallery"] img').as('imageGallery');
        });
      
        it('should not return any images when search term is invalid', () => {
          cy.get('@searchInput').type('jehrjehrjehrjkerae {enter}');
          cy.contains('No content found').should('be.visible');
          cy.get('@imageGallery').should('not.be.visible');
        });
      
        it('should return images when search term is valid', () => {
          cy.get('@searchInput').type('pancakes {enter}');
          cy.get('@imageGallery')
            .should('be.visible')
            .and('have.length', 10);
        });
      });
             
    })
      // cy.visit('https://www.flipkart.com')
      // cy.log("Step 1: ---------- Naviagted to Flipkart.com------------")
      // cy.get('img[title="Flipkart"]').click();
      // cy.log("Step 2 : ---------- Flipkart logo clicked ------------")
      // cy.xpath("//span[@role='button']").click();
      // cy.log("Step 3: ---------- Login Window Closed ------------")
      // cy.xpath("//a[@title='Login']/span").should('contain.text','Login')
      // cy.log("Step 4: ---------- Asserted if Login link has text 'Login'  ------------")
    //})
    // it('sends XHR to the server and gets expected response', () => {
    //   cy.visit('https://demo.nopcommerce.com/')
    //   // before the request goes out we need to set up spying
    //   // see https://on.cypress.io/network-requests
    //   cy.server()
    //   cy.route('POST', '/posts').as('post')
    //   cy.get('#load').click()
    //   // make sure the XHR completes and the UI changes
    //   cy.contains('#output', '"title": "example post"').should('be.visible')
    // })

})