describe('Teste de API da requisição POST https://api.restful-api.dev/objects', () => {
    before(() => {
        Cypress.config('baseUrl', 'https://api.restful-api.dev')
      })

    it('Deve incluir novo objeto', () => {
        cy.fixture('postObject.json').then((newObject) => {
            cy.makeRequest('POST', '/objects', newObject).then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
                expect(response.body).to.haveOwnProperty('id')
                expect(response.body).to.haveOwnProperty('name')
                expect(response.body).to.haveOwnProperty('data')
                expect((response.body.name)).to.deep.equal(newObject.name)
                expect((response.body.data)).to.deep.equal(newObject.data)
            })
        })
    })

    it('Deve tentar incluir novo objeto, sem enviar campos necessários', () => {
        cy.makeRequest('POST', '/objects').then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(400)
            expect(response.body).to.be.an('Object')
            expect(response.body).to.haveOwnProperty('error')
            expect(response.body.error).to.be.equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
        })
    })
})