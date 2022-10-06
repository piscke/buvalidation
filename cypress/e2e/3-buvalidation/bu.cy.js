/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('validando a bu', () => {
  beforeEach(() => {
    cy.visit('https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;zn=0002;se=0824/dados-de-urna;e=e544;uf=ap;ufbu=ap;mubu=06050/boletim-de-urna');
    cy.viewport(1500, 600);
  })

  it('a contagem de votos deveria ser sempre a mesma', () => {
    cy.xpath("//ion-icon[@src='assets/icones/marcador.svg']").click();
    
    let values = [];
    cy.xpath("//p[text() = 'Comparecimento']/following-sibling::p[1]").each((item, index, list) => {
      // Returns the elements from the cy.get command
      values.push(item.text);
      const result = values.every( v => v === values[0]);
      expect(result).to.be.true
    });
  })
})
