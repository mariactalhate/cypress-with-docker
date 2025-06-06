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
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('makeRequest', (method, url, body, headers = {}) => {
    cy.request({
        method: method,     
        url: url,             
        body: body,          
        headers: headers,       
        failOnStatusCode: false 
      })
})

Cypress.Commands.add('makeLogin', () => {
    cy.intercept('POST', '/authenticate').as('authenticationRequest');
      cy.get('input').eq(0).type('tomsmith')
      cy.get('input').eq(1).type('SuperSecretPassword!')
      cy.get('button').click()
      cy.wait('@authenticationRequest');
})
