describe('Teste 2E2 do componente Redirect', () => {

  before(() => {
    Cypress.config('baseUrl', 'https://the-internet.herokuapp.com');
  })
  
  beforeEach(() => {
    cy.log('Acessa a webpage')
    cy.visit('/redirector')
  })

  it('Deve validar elementos da página', () => {
    cy.log('Valida o título da página')
    cy.title().should('include', 'The Internet')
    cy.log('Valida o texto no h3 da página')
    cy.get('h3').should('have.text', 'Redirection')
    cy.get('p').should('contain', 'This is separate from directly returning a redirection status code, in that some browsers cannot handle a raw redirect status code without a destination page as part of the HTTP response.')
    cy.get('p').should('contain', 'Click here to trigger a redirect (and be taken to the status codes page).')
    cy.get('a[id="redirect"]').its('length').should('eq', 1)
  })

  it('Deve validar interatividade do redirect', () => {
    cy.intercept('GET', '/redirect').as('redirectRequest');
    cy.log('Clica no elemento redirect')
    cy.get('a[id="redirect"]').click()
    cy.wait('@redirectRequest')
    cy.log('Valida que foi redirecionado para a página de status codes')
    cy.url().should('include', '/status_codes')
    cy.get('h3').should('have.text', 'Status Codes')
  })

})