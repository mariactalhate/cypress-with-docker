import 'cypress-file-upload';


describe('Teste 2E2 do componente File Uploader', () => {
  before(() => {
    Cypress.config('baseUrl', 'https://the-internet.herokuapp.com');
  })

  beforeEach(() => {
    cy.log('Acessa a webpage')
    cy.visit('/upload')
  })

  it('Valida elementos da página', () => {
    cy.log('Valida o título da página')
    cy.title().should('include', 'The Internet')
    cy.log('Valida o texto no h3 da página')
    cy.get('h3').should('have.text', 'File Uploader')
    cy.get('p').should('have.text', 'Choose a file on your system and then click upload. Or, drag and drop a file into the area below.')
    cy.log('Valida o input de upload de arquivos')
    cy.get('input[id="file-upload"]').should('be.visible').should('not.be.disabled')
    cy.get('input[id="file-submit"]').should('be.visible').should('not.be.disabled')
    cy.log('Valida o drag and drop de upload de arquivos')
    cy.get('div[id="drag-drop-upload"]').should('be.visible').should('not.be.disabled')
  })

  it('Valida upload de arquivos pelo input', () => {
    cy.intercept('POST', '/upload').as('uploadRequest');
    cy.log('Seleciona o campo de input de arquivos e realiza upload da fixture imagem.png')
    cy.get('input[id="file-upload"]').attachFile('image.png')
    cy.get('input[id="file-submit"]').click();
    cy.wait('@uploadRequest')
    cy.log('Valida que foi direcionado para página de upload realizado')
    cy.get('h3').should('have.text', 'File Uploaded!')
    cy.log('Valida que image.png está no campo de uploads realizados')
    cy.get('div[id="uploaded-files"]').should('be.visible').and('contain', 'image.png')
  })
  
  it('Valida upload de arquivos pelo drag and drop', () => {
    cy.intercept('POST', '/upload').as('uploadRequest');
    const fileName = 'image.png'
    cy.fixture(fileName, 'base64').then(fileContent => {
      cy.get('div[id="drag-drop-upload"]').attachFile(
        { fileContent, fileName, mimeType: 'image.png'},
        { subjectType: 'drag-n-drop'}
      )
    })
    cy.wait('@uploadRequest')
    cy.log('Valida que image.png está no campo de uploads realizados')
    cy.get('div[class="dz-filename"]').should('have.text', 'image.png')
    cy.get('div[class="dz-success-mark"]').should('be.visible')

  })
  
})