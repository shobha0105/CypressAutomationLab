/// <referencetypes="Cypress" />


describe('TestSuite', () => {
  //declare a global variable 
  let testData

//runs once when TC begins execution  
before(function(){
    cy.fixture('example').then(function(data){
      testData=data // with testdata will be accessible in entire Testcase
     //cy.log(this.data.email)
     

    })
})
    it('Object Controls Testcase',() => {
     // cy.log(testData.name)
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
      cy.get('#displayed-text').type(testData.email)
     


      cy.log("************* CHECKBOXES **********************")
      //Chai assertion with "be." //behavior //property of object and chain assertion with .and to chk value=option1 
      cy.get('input#checkBoxOption1').check().should('be.checked').and('have.value','option1')
      //uncheck the checkbox and assert
      cy.get('input#checkBoxOption1').uncheck().should('not.be.checked')

      //check by index - pass array of values in check method 
      cy.get('input[type="checkbox"]').check(['option2','option3'])

      cy.log("************* STATIC DROPDOWN **********************")
      cy.get('select').select('option2').should('have.value','option2')

      cy.log("************* DYNAMIC DROPDOWN **********************")
      cy.get('input#autocomplete').type("Ind")
      cy.get(".ui-menu-item div").each(($el,index,$list)=>{
        if($el.text()==="India"){
          $el.click()
        }
      })
      cy.get('input#autocomplete').should("have.value","India")

      cy.log("************* Radiobutton ************")
      //cy.get('[for="radio1"]').click().should('be.clicked').and('have.value','radio1')
      cy.get(".radioButton").first().check().should('be.checked')

      cy.log("************* ALERT AND POPUP WINDOWS ************")
      cy.get('#alertbtn').click()
      cy.get('#confirmbtn').click()
      //no inbuilt method to read text from pop up hence get it through event listener and 
      //Mocha assertion to compare string to string
      cy.on("window:alert",(str)=>{
    
          //Compare Str to String usign Mocha           
          expect(str).to.equal("Hello , share this practice page and share your knowledge")
      
      })

      //for confirm 
      cy.on("window:confirm",(str)=>{
    
        //Compare Str to String usign Mocha           
        expect(str).to.equal("Hello , Are you sure you want to confirm?")
    
    })

    cy.log("------------------------- TABS HANDLING ------------------------------------")
    //invoke(), removeAttr, target attr

    // cy.get('#opentab').invoke('removeAttr','target').click() //this will remove target attr and open the target page in same tab
    // cy.go('back')


      
    })


})