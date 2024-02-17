/// <referencetypes="Cypress" />
describe('Assignment', () => {
  //declare a global variable 
  let profileData
  var varEmail, varPwd
  var arrEmailsplit
  var dt=null, mth=null, randomChr
  var  Months, selectedMth
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  

//runs once when TC begins execution  
before(function(){
    cy.fixture('profile').then(function(logindata){
      profileData=logindata // with testdata will be accessible in entire Testcase
     
    })
   
    
})
it('Registration Testcase',() => {    
      cy.log("========== REGISTRATION FUNCTIONALITY ==========")

    //Launch browser and open url 
     cy.visit("https://demo.nopcommerce.com/login?returnUrl=%2F")
     cy.wait(2000)
     cy.get('a.ico-register').scrollIntoView();
     //Click on Register button 
     cy.get('a.ico-register').click()
     
     cy.wait(3000)
     //verify landing page
     cy.get('h1').should('have.text','Register')
     cy.wait(2000)

     //Select Gender radiobtn 
     if(profileData.gender==='male'){
      cy.get("input[type='radio']").eq(0).check()
     }
     else{
      cy.get("input[type='radio']").eq(1).check()
     }
     
     //Enter First Name 
     cy.get("input#FirstName").type(profileData.firstName)
     //Enter LastName
     cy.get("input#LastName").type(profileData.lastName)
     //Enter DOB random generated date 
     //------------Date Value calculation ---------
      randomChr=Math.floor(Math.random() * 20);
     
     cy.get('[name="DateOfBirthDay"]').select(randomChr)
      //-----------------------------------------------
      //-----------Month text computation ----------------
      Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'];
      selectedMth = Months[Math.floor(Math.random()*Months.length)];

      cy.get('[name="DateOfBirthMonth"]').select(selectedMth)
      //--------------------------------------------------------

      //---------Static Year from profile Fixture----------------
     cy.get('[name="DateOfBirthYear"]').select(profileData.year)
     //---------------------------------------------------------
     //---------Computing unique Email------------------------
     // Split email passed from profile fixture by delimiter _ and 
     //append random 5 chr to make it unique during registration
     arrEmailsplit = (profileData.email).split("_")
     let counter = 0;
    while (counter < 5) {
      randomChr += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
     
     varEmail= arrEmailsplit[0] +'_'+randomChr+'_'+arrEmailsplit[1]
     varPwd = profileData.password+randomChr
     cy.get('input#Email').type(varEmail)
     //Company
     cy.get('input#Company').type(profileData.company)
     cy.get('input#Password').type(varPwd)
     cy.get('input#ConfirmPassword').type(varPwd)
     //Click on Register
     cy.get('button#register-button').click()
     cy.wait(5000)
     //Validate after registration completed succesfully
     cy.get('div.result').should('have.text','Your registration completed')
     cy.log("* * * * * * REGISTRATION COMPLETED SUCCESSFULLY for Email : "+ varEmail);

     
 })

it('Login Testcase',() => {
    cy.log("========== LOGIN FUNCTIONALITY ==========")

    cy.log("Email "+varEmail,"Password" +varPwd)
    cy.performLogin(varEmail,varPwd)
    cy.log("* * * * * * LOGIN COMPLETED SUCCESSFULLY for Email : "+ varEmail);

})

})