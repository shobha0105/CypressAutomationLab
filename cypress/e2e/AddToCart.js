/// <referencetypes="Cypress" />


describe('Assignment', () => {
  //declare a global variable 
  let tData

//runs once when TC begins execution  
before(function(){
    cy.fixture('testdata').then(function(data){
      tData=data // with testdata will be accessible in entire Testcase
     //cy.log(this.data.email)
     

    })
})
    it('Assignment #1 and 4 Testcase',() => {
    //Launch browser and open url 
     cy.visit("https://demo.nopcommerce.com/")

     //Enter text in search box and click on Search button : Data fetched from testdata.json fixture
     cy.get('input#small-searchterms').type(tData.productToSrch)
     cy.get('button[type="submit"]').click();
     //assert if 2 products display
     cy.get('div.picture').should('have.length',2)
     //Loop through the elements in search resultant
     let ctr=0;
     cy.get('.product-item > .details').each(($el,index,$list)=>{
      ctr=index+1;
      //getText or product name of the items displayed 
        const prod=$el.find('.product-title > a').text()
        //Name of the products displayed after search
        cy.log("Products displayed after search :"+ prod )
        //if element text is as per parameter/testdata , add it to cart
          if($el.find('.product-title > a').text()===tData.productToAdd){
           // $el.find('.buttons > .product-box-add-to-cart-button').dblclick()
           cy.log("Ctr "+ctr);
           cy.get(':nth-child('+ctr+') > .product-item > .details > .add-info > .buttons > .product-box-add-to-cart-button').scrollIntoView();
           cy.wait(1000)
           cy.get(':nth-child('+ctr+') > .product-item > .details > .add-info > .buttons > .product-box-add-to-cart-button').dblclick()
           cy.wait(2000)
           let qtyTxt;
           cy.get('.cart-qty').then(function(cartQty)
           {
             //IMP : jquery methods like text() works only after explicitly resolving promise usign then()
             cy.log(cartQty.text())
             qtyTxt=cartQty.text()
           })
            //If shopping cart qty still shows 0 , reclick the Add to Cart
           if(qtyTxt==='(0)'){
            
            cy.get(':nth-child('+ctr+') > .product-item > .details > .add-info > .buttons > .product-box-add-to-cart-button').dblclick()
           }
           cy.log(tData.productToAdd+" Product Added to Cart")
          }
     })
     cy.wait(2000)
     //Click on Shopping Cart 
      cy.get('a span.cart-label').click();
     //verify landing page
     cy.get('h1').should('have.text','Shopping cart')
     cy.wait(2000)
     //clear Qty of the product and add quantity
     cy.get('input.qty-input').scrollIntoView();
     cy.get('input.qty-input').clear()
     cy.get('input.qty-input').type(tData.addQty)
     //Update to cart
     cy.get('button#updatecart').click()
     //Assert shopping cart qty shows as expected
     cy.get('.cart-qty').should('have.text','('+tData.addQty+')')
     //Calculate Total price basis quantity of product added to cart. Map data from fixture. Convert num to string
     var Totalprice = (tData.addQty * tData.perProdPrice).toFixed(2)
     cy.log(Totalprice)
     //Assert Total price is as per derived value with $ prefixed
     cy.get('span.product-subtotal').should('have.text','$'+Totalprice)
     cy.log(' Assignment #1 - Product Search and Add to Cart functionality - COMPLETED')
     cy.log(' Assignment #4 - Data driven functionality - COMPLETED')
    })

    
     

})