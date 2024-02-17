/// <referencetypes="Cypress" />


describe('XHT_API', () => {
    it('XHT Testcase',() => {
      cy.visit('https://reqres.in/')
      cy.intercept('GET', 'https://reqres.in/api/users?page=2', { fixture: 'users.json' }).as('getUsers')
      cy.visit('https://reqres.in/')
      cy.wait('@getUsers').then((interception)=>{
        // assert response body data length =6
        expect(interception.response.body.data).to.have.length(6)
        //assert the date[0].email
        expect(interception.response.body.data[0].email).to.eq('michael.lawson@reqres.in')
      })
    })   

})