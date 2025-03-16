describe('Teste 2E2 do componente Dropdown', () => {
  before(() => {
    Cypress.config('baseUrl', 'https://the-internet.herokuapp.com');
  })

  beforeEach(() => {
    cy.log('Acessa a webpage')
    cy.visit('/dropdown')
  })

  it('Deve validar componentes da página dropdown', () => {
    cy.log('Valida o título da página')
    cy.title().should('include', 'The Internet')
    cy.log('Valida o texto no h3 da página')
    cy.get('h3').should('have.text', 'Dropdown List')
    cy.log('Valida que existe exatamente 1 dropdown')
    cy.get('select[id="dropdown"]').should('have.length', 1);
    cy.log('Valida que dropdown possui 3 opções: 1 desabilitada e 2 habilitadas')
    cy.get('select option').should('have.length', 3)
    cy.get('select option:disabled').should('have.length', 1)
    cy.get('select option:not(:disabled)').should('have.length', 2)
    cy.log('Valida o texto das opções')
    cy.get('select option').eq(0).should('have.text', 'Please select an option')
    cy.get('select option').eq(1).should('have.text', 'Option 1')
    cy.get('select option').eq(2).should('have.text', 'Option 2')
  })

  it('Deve validar estado inicial das opções', () => {
    cy.log('Valida que PLEASE SELECT AN OPTION está desabilitada e selecionada')
    cy.get('select option').eq(0).should('be.disabled').and('have.prop', 'selected', true)
    cy.log('Valida que OPTION 1 está habilitada e não está selecionada')
    cy.get('select option').eq(1).should('not.be.disabled').and('have.prop', 'selected', false)
    cy.log('Valida que OPTION 2 está habilitada e não está selecionada')
    cy.get('select option').eq(2).should('not.be.disabled').and('have.prop', 'selected', false)
  })

  it('Deve validar que é possível selecionar elementos habilitados', () => {
    cy.log('Seleciona OPTION 1')
    cy.get('select').select('Option 1')
    cy.log('Valida que OPTION 1 foi selecionada')
    cy.get('select option').eq(1).should('have.prop', 'selected', true)
    cy.log('Seleciona OPTION 2')
    cy.get('select').select('Option 2')
    cy.log('Valida que OPTION 2 foi selecionada')
    cy.get('select option').eq(2).should('have.prop', 'selected', true)
  })
})