/// <reference types="cypress" />

describe('validando a bu', () => {
  beforeEach(() => {
    cy.visit('https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;/dados-de-urna/boletim-de-urna');
    cy.viewport(1500, 600);
  })

  it('displays two todo items by default', () => {
    cy.get('div[title*="Alterar localidade"]').click();
    
    cy.get('input[formcontrolname="uf"]').click();
    const estados = cy.get('mat-option').children();
    estados.contains('Amapá').click();

    cy.get('input[formcontrolname="municipio"]').click();
    const municipios = cy.get('mat-option').children();
    municipios.contains('Macapá').click();

    cy.contains("Confirmar").click();

    let navigator = cy.get('div[class*="flex flex-1 gap-4 ng-star-inserted"]').children();
    
    navigator.eq(0).click();
    const zones = cy.get('mat-option');
    zones.eq(1).click();

    navigator = cy.get('div[class*="flex flex-1 gap-4 ng-star-inserted"]').children();
    navigator.eq(1).click();
    const sessions = cy.get('mat-option');
    sessions.eq(1).click();

    navigator = cy.get('div[class*="flex flex-1 gap-4 ng-star-inserted"]').children();
    navigator.eq(2).click();

    let comparecimentos = [];
    cy.xpath("//p[text() = 'Comparecimento']/following-sibling::p[1]", {timeout:50000}).each((item) => {
      comparecimentos.push(item.text().trim());
    }).then(()=>{
      const result = comparecimentos.every( v => v === comparecimentos[0]);
      cy.log(result);
      expect(result).to.be.true;
    });
  })
})
