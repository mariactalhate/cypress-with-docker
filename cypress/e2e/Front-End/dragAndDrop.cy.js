describe('Teste 2E2 do componente Drag and Drop', () => {
  before(() => {
    Cypress.config('baseUrl', 'https://the-internet.herokuapp.com');
  })

  beforeEach(() => {
    cy.log('Acessa a webpage')
    cy.visit('/drag_and_drop')
  })

  it('Deve validar componentes da página drag and drop', () => {
    cy.log('Valida o título da página')
    cy.title().should('include', 'The Internet')
    cy.log('Valida o texto no h3 da página')
    cy.get('h3').should('have.text', 'Drag and Drop')
    cy.log('Valida que exatamente 2 elementos estão presentes e são do tipo draggable: true')
    cy.get('div[class="column"]')
        .should('have.length', 2)
        .each(($element) => { 
          cy.wrap($element).should('have.attr', 'draggable', 'true')
        });
  })

  it('Valida estado inicial dos elementos', () => {
    cy.get('div[class="column"]').eq(0).should('contain', 'A')
    cy.get('div[class="column"]').eq(1).should('contain', 'B')
  })

  it('Deve validar interatividade dos elementos', () => {
    const dataTransfer = new DataTransfer();
    cy.log('Arrastar coluna A para coluna B')
    cy.get('div[class="column"]').eq(0).trigger('dragstart', { dataTransfer });
    cy.get('div[class="column"]').eq(1).trigger('drop', { dataTransfer });
    cy.log('Valida que dados foram transferidos')
    cy.get('div[class="column"]').eq(0).should('contain', 'B')
    cy.get('div[class="column"]').eq(1).should('contain', 'A')
  })
})