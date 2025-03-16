describe('Teste 2E2 do componente Login', () => {

  before(() => {
    Cypress.config('baseUrl', 'https://the-internet.herokuapp.com');
  })

  beforeEach(() => {
    cy.log('Acessa a webpage')
    cy.visit('/login')
  })

  it('Deve validar elementos da página', () => {
    cy.log('Valida o título da página')
    cy.title().should('include', 'The Internet')
    cy.log('Valida o texto no h3 da página')
    cy.get('h2').should('have.text', 'Login Page')
    cy.log('Valida o texto no h4 da página')
    cy.get('h4').should('have.text', 'This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.')
    cy.log('Valida que existem exatamente 2 inputs do tipo texto')
    cy.get('input').should('have.length', 2)
    cy.log('Valida que existe elemento botão com texto Login')
    cy.get('button').should('have.text', ' Login')
  })

  it('Deve validar sucesso ao realizar login com dados válidos', () => {
    cy.intercept('POST', '/authenticate').as('authenticationRequest');
    cy.get('input').eq(0).type('tomsmith')
    cy.get('input').eq(1).type('SuperSecretPassword!')
    cy.get('button').click()
    cy.wait('@authenticationRequest');
    cy.url().should('include', '/secure');
    cy.log('Valida o título da página')
    cy.title().should('include', 'The Internet')
    cy.log('Valida o texto no h3 da página')
    cy.get('h2').should('have.text', ' Secure Area')
    cy.get('h4').should('have.text', 'Welcome to the Secure Area. When you are done click logout below.')
    cy.get('.button').should('have.text', ' Logout')
  })

  it('Deve validar que não é possível acessar área segura sem logar', () => {
    cy.visit('/secure')
    cy.url().should('not.include', '/secure')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'You must login to view the secure area');
  })

  it('Deve validar que não é possível logar sem informar dados', () => {
    cy.get('button').click()
    cy.url().should('not.include', '/secure')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'Your username is invalid!');
  })

  it('Deve validar que não é possível logar sem informar a senha', () => {
    cy.get('input').eq(0).type('tomsmith')
    cy.get('button').click()
    cy.url().should('not.include', '/secure')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'Your password is invalid!');
  })

  it('Deve validar que não é possível logar com senha incorreta', () => {
    cy.get('input').eq(0).type('tomsmith')
    cy.get('input').eq(1).type('senha incorreta')
    cy.get('button').click()
    cy.url().should('not.include', '/secure')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'Your password is invalid!');
  })

  it('Deve validar que não é possível logar com dados incorretos', () => {
    cy.get('input').eq(0).type('maria')
    cy.get('input').eq(1).type('talhate')
    cy.get('button').click()
    cy.url().should('not.include', '/secure')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'Your username is invalid!');
  })

})