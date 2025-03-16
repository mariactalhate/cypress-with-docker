# Cypress with Docker

Este repositório demonstra como configurar o [Cypress](https://www.cypress.io/) com o [Docker](https://www.docker.com/) para executar testes automatizados de frontend em ambientes de contêineres.

## Pré-requisitos

Antes de começar, você precisará ter os seguintes itens instalados na sua máquina:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (opcional, se você quiser rodar o Cypress fora do Docker)

---

## Instalação

Siga os passos abaixo para configurar o ambiente e começar a usar o Cypress com Docker:

1. Clone este repositório:

   ```bash
   git clone https://github.com/mariactalhate/cypress-with-docker.git
   cd cypress-with-docker

2. Construa a imagem Docker
   ```bash
    docker build -t cypress/included .

3. Execute o container Docker com Cypress
   ```bash
   docker run -it --rm -v .:/app -w /app cypress/included

Isso irá rodar o Cypress dentro do contêiner