/// <referencetypes="Cypress" />



describe('TestSuite', () => {
    it('Ecommerce Testcase',() => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      cy.get('input.search-keyword').type('ca')
      cy.get('div.product:visible').should('have.length',4)
      // get descendant dom elements using 'find' / child  --- relative xpath
      cy.get('.products').find('.product').should('have.length',4).then(function()
      {
          console.log("Length Check - DONE")
      })
      //get a DOM element at specific index
     // cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()
     // click on Add to Cart for Capsicum using xpath 
     // cy.xpath("//h4[@class='product-name' and contains(text(),'Capsicum')]/following::button[text()='ADD TO CART'][1]").click()

      // To get products , check if it is Cashew and then click Add to Cart using loop concept
      cy.get('.products').as('PdtObj')
      //using Alias for products 
      cy.get('@PdtObj').find('.product').each(($e,index,$list)=>{
        const textVeg=$e.find('h4.product-name').text()
        if(textVeg.includes('Cashews')){
              $e.find('button').click()
        }

      })
      //IMP: Handle asynchronous command through promise then ()
      cy.get('.brand').then(function(logEle)
      {
        //IMP : jquery methods like text() works only after explicitly resolving promise usign then()
        cy.log(logEle.text())
        //verify if text() is GreenKart
       
    })
    //IMP: ERROR - text() is not cypress command so this would error 
     //cy.log(cy.get('.brand').text())
     
     cy.get('.brand').should('have.text','GREENKART')

    })

})