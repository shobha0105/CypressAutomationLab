// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//


//---------------------------Custom command added for Login functionality-----------------------//
// -- This is a Login command --
Cypress.Commands.add('performLogin',(email,pwd) =>{
    cy.log("############ Login FUNCTIONALITY ############")

//Launch browser and open url 
 cy.visit("https://demo.nopcommerce.com/login?returnUrl=%2F")
 cy.wait(2000)
 //verify landing page
 cy.get('h1').should('have.text','Welcome, Please Sign In!')
 cy.wait(2000)
 //Enter valid Email 
 cy.get('input#Email').type(email)
 //Enter valid password for the Email entered
 cy.get('input#Password').type(pwd)
 //Click on Login btn
 cy.get('button.button-1.login-button').click()
 cy.wait(2000)
 //Click on Register
 //Click on Register
 cy.get('.ico-logout').then($logOutBtn =>{
  if($logOutBtn.is(':visible')){
    cy.log("LogOut button is visible")
  
  }
  cy.get('.ico-logout').should('be.visible')

 })
})

  




