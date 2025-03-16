describe('Teste 2E2 do componente Login', () => {

  before(() => {
    Cypress.config('baseUrl', 'https://the-internet.herokuapp.com')
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
    cy.log('Intercepta request de autenticação')
    cy.intercept('POST', '/authenticate').as('authenticationRequest');
    cy.log('Realiza login')
    cy.get('input').eq(0).type('tomsmith')
    cy.get('input').eq(1).type('SuperSecretPassword!')
    cy.get('button').click()
    cy.log('Aguarda pela request de autenticação')
    cy.wait('@authenticationRequest');
    cy.log('Valida que url é da área segura')
    cy.url().should('include', '/secure');
    cy.log('Valida o título da página')
    cy.title().should('include', 'The Internet')
    cy.log('Valida o texto no h2 e h4 da página')
    cy.get('h2').should('have.text', ' Secure Area')
    cy.get('h4').should('have.text', 'Welcome to the Secure Area. When you are done click logout below.')
    cy.log('Valida botão de logout')
    cy.get('.button').should('have.text', ' Logout')
  })

  it('Deve validar que não é possível acessar área segura sem logar', () => {
    cy.log('Tenta acessar URL de área segura sem autenticar')
    cy.visit('/secure')
    cy.log('Valida que url não é da área segura')
    cy.url().should('not.include', '/secure')
    cy.log('Valida flash de erro')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'You must login to view the secure area');
  })

  it('Deve validar que não é possível logar sem informar dados', () => {
    cy.log('Clica no botão de login sem preencher dados')
    cy.get('button').click()
    cy.log('Valida que url não é da área segura')
    cy.url().should('not.include', '/secure')
    cy.log('Valida flash de erro')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'Your username is invalid!');
  })

  it('Deve validar que não é possível logar sem informar a senha', () => {
    cy.log('Preenche apenas campo de username, com username válido')
    cy.get('input').eq(0).type('tomsmith')
    cy.log('Clica em botão de login')
    cy.get('button').click()
    cy.log('Valida que url não é da área segura')
    cy.url().should('not.include', '/secure')
    cy.log('Valida flash de erro')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'Your password is invalid!');
  })

  it('Deve validar que não é possível logar com senha incorreta', () => {
    cy.log('Preenche apenas campo de username, com username válido')
    cy.get('input').eq(0).type('tomsmith')
    cy.log('Preenche campo de senha com senha incorreta')
    cy.get('input').eq(1).type('senha incorreta')
    cy.log('Clica no botão de login')
    cy.get('button').click()
    cy.log('Valida que url não é da área segura')
    cy.url().should('not.include', '/secure')
    cy.log('Valida flash de erro')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'Your password is invalid!');
  })

  it('Deve validar que não é possível logar com dados incorretos', () => {
    cy.log('Preenche campos com dados incorretos')
    cy.get('input').eq(0).type('maria')
    cy.get('input').eq(1).type('talhate')
    cy.log('Clica no botão de login')
    cy.get('button').click()
    cy.log('Valida que url não é da área segura')
    cy.url().should('not.include', '/secure')
    cy.log('Valida flash de erro')
    cy.get('div[class="flash error"]').should('be.visible').and('contain', 'Your username is invalid!');
  })

  it('Deve validar logout', () => {
    cy.log('Intercepta request de logout')
      cy.intercept('GET', '/logout').as('logoutRequest');
      cy.log('Realiza login')
      cy.makeLogin()
      cy.log('Clica em botão de logout')
      cy.get('.button').click()
      cy.log('Aguarda response de logout')
      cy.wait('@logoutRequest')
      cy.log('Valida minimamente que retornou à página de login')
      cy.get('h2').should('have.text', 'Login Page')
    })
})