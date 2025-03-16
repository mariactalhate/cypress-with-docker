describe('Teste de API da requisição GET https://api.restful-api.dev/objects', () => {
    before(() => {
        Cypress.config('baseUrl', 'https://api.restful-api.dev')
      })

    it('Deve listar todos os objetos', () => {
        cy.log('Busca fixture para comparação com response')
        cy.fixture('getObjects.json').then((expectedObjects) => {
            cy.log('Envia requisição de listagem')
            cy.makeRequest('GET', '/objects').then((response) => {
                cy.log('Valida status e campos da requisição')
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                expect(response.body[0]).to.haveOwnProperty('id')
                expect(response.body[0]).to.haveOwnProperty('name')
                expect(response.body[0]).to.haveOwnProperty('data')
                expect(response.body).to.deep.equal(expectedObjects)
            })
        })
    })

    it('Deve listar um range específico de objetos', () => {
        cy.log('Envia requisição de listagem por range válido')
        cy.makeRequest('GET', '/objects?id=3&id=5&id=10').then((response) => {
            cy.log('Valida status e campos da requisição')
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body.length).to.eq(3)
            expect(response.body[0]).to.haveOwnProperty('id')
            expect(response.body[0]).to.haveOwnProperty('name')
            expect(response.body[0]).to.haveOwnProperty('data')
            cy.wrap(response.body).each((item) => {
                expect(item.id).to.be.oneOf(['3', '5', '10'])
            })
        })


    })

    it('Deve buscar range inexistente', () => {
        cy.log('Envia requisição de listagem por range inválido')
        cy.makeRequest('GET', '/objects?id=500&id=1000').then((response) => {
            cy.log('Valida status e campos da requisição')
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body).to.be.empty
        })
    })

    it('Deve listar objeto pela ID', () => {
        cy.log('Envia requisição de listagem por ID válida')
        cy.makeRequest('GET', '/objects/7').then((response) => {
            cy.log('Valida status e campos da requisição')
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('Object')
            expect(response.body).to.haveOwnProperty('id')
            expect(response.body).to.haveOwnProperty('name')
            expect(response.body).to.haveOwnProperty('data')
            expect(response.body.id).to.eq('7')
        })
    })

    it('Deve buscar ID inexistente', () => {
        cy.log('Envia requisição de listagem por ID inválida')
        cy.makeRequest('GET', '/objects/500').then((response) => {
            cy.log('Valida status e campos da requisição')
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(404)
            expect(response.body).to.be.an('Object')
            expect(response.body).to.haveOwnProperty('error')
            expect(response.body.error).to.equal('Oject with id=500 was not found.')
        })
    })
})