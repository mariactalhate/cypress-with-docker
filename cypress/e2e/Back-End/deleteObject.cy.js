describe('Teste de API da requisição DELETE https://api.restful-api.dev/objects/id', () => {
    before(() => {
        Cypress.config('baseUrl', 'https://api.restful-api.dev')
      })

    it('Deve deletar um objeto', () => {
        cy.log('Cria fixture com body de objeto a ser criado')
        cy.fixture('postObject.json').then((newObject) => {
            cy.log('Cria novo objeto')
            cy.makeRequest('POST', '/objects', newObject).then((object) => {
                cy.log('Deleta objeto criado')
                cy.makeRequest('DELETE', `/objects/${object.body.id}`).then((response) => {
                    cy.log('Valida status e campos da requisição')
                    cy.log(JSON.stringify(response.body))
                    expect(response.status).to.eq(200)
                    expect(response.body).to.be.an('Object')
                    expect(response.body).to.haveOwnProperty('message')
                    expect(response.body.message).to.contain(`Object with id = ${object.body.id} has been deleted`)
                })
            })
        })
    })

    it('Deve tentar deletar um objeto que possui ID reservada', () => {
        cy.log('Envia requisição de deleção para objeto reservado')
        cy.makeRequest('DELETE', '/objects/7').then((response) => {
            cy.log('Valida status e campos da requisição')
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(405)
            expect(response.body).to.be.an('Object')
            expect(response.body).to.haveOwnProperty('error')
            expect(response.body.error).to.be.equal('7 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.')
        })
    })

    it('Deve tentar atualizar um objeto sem enviar campos necessários', () => {
        cy.log('Envia requisição sem campo de ID')
        cy.makeRequest('DELETE', '/objects').then((response) => {
            cy.log('Valida status e campos da requisição')
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(405)
            expect(response.body).to.be.an('Object')
            expect(response.body).to.haveOwnProperty('error')
            expect(response.body.error).to.be.equal('Method Not Allowed')
        })
    })
})