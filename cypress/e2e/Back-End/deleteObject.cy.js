describe('Teste de API da requisição DELETE https://api.restful-api.dev/objects/id', () => {
    before(() => {
        Cypress.config('baseUrl', 'https://api.restful-api.dev')
      })

    it('Deve deletar um objeto', () => {

        cy.fixture('postObject.json').then((newObject) => {
            cy.makeRequest('POST', '/objects', newObject).then((object) => {
                cy.makeRequest('DELETE', `/objects/${object.body.id}`).then((response) => {
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
        cy.makeRequest('DELETE', '/objects/7').then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(405)
            expect(response.body).to.be.an('Object')
            expect(response.body).to.haveOwnProperty('error')
            expect(response.body.error).to.be.equal('7 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.')
        })
    })

    it('Deve tentar atualizar um objeto sem enviar campos necessários', () => {
        cy.makeRequest('DELETE', '/objects').then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(405)
            expect(response.body).to.be.an('Object')
            expect(response.body).to.haveOwnProperty('error')
            expect(response.body.error).to.be.equal('Method Not Allowed')
        })
    })
})