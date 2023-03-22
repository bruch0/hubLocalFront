/// <reference types="cypress" />
import faker from "faker";

describe("Locals Page", () => {
  it("Should display the page, add a local, display the table, edit a local, check company locals and delete the local", () => {
    cy.login();

    cy.contains("Adicionar Empresa").should("be.visible").click();
    cy.contains("Nome")
      .next()
      .should("be.visible")
      .type(faker.company.companyName());
    cy.contains("Website")
      .next()
      .should("be.visible")
      .type(faker.internet.url());
    cy.contains("CNPJ")
      .next()
      .should("be.visible")
      .type(
        faker.helpers.regexpStyleStringParse(
          "[10-99][100-999][100-999][1000-9999][10-99]"
        )
      );

    cy.get("form").find("button").should("be.visible").click();

    cy.get("td").find("svg").eq(1).should("be.visible").click();
    cy.contains("Minhas Empresas").should("be.visible");
    cy.contains("Nenhum local cadastrado!").should("be.visible").click();
    cy.contains("Adicionar Local").should("be.visible").click();

    cy.contains("Nome").next().should("be.visible").type(faker.name.findName());
    cy.contains("CEP")
      .next()
      .should("be.visible")
      .type("[11111 - 99999][111 - 999]");
    cy.contains("Rua")
      .next()
      .should("be.visible")
      .type(faker.address.streetAddress());
    cy.contains("Número")
      .next()
      .should("be.visible")
      .type(faker.datatype.number());
    cy.contains("Bairro")
      .next()
      .should("be.visible")
      .type(faker.address.county());
    cy.contains("Cidade")
      .next()
      .should("be.visible")
      .type(faker.address.city());
    cy.contains("Estado")
      .next()
      .should("be.visible")
      .type(faker.address.state());
    cy.get("form").find("button").should("be.visible").click();

    cy.contains("Local").should("be.visible");
    cy.contains("Ações").should("be.visible");
    cy.contains("Página").should("be.visible");
    cy.contains("Qt por página").should("be.visible");
    cy.contains("Anterior").should("be.visible");
    cy.contains("Próxima").should("be.visible");
    cy.contains("Local cadastrado").should("be.visible").click();
    cy.wait(500);

    const newName = faker.name.findName();
    cy.get("td").find("svg").first().should("be.visible").click();
    cy.contains("Nome").next().should("be.visible").clear().type(newName);
    cy.get("form").find("button").should("be.visible").click();
    cy.contains(newName).should("be.visible");
    cy.contains("Local atualizado").should("be.visible").click();
    cy.wait(500);

    cy.get("td").find("svg").eq(1).should("be.visible").click();
    cy.contains(
      `O local ${newName} será excluído. Tem certeza dessa ação?`
    ).should("be.visible");
    cy.get("form").find("button").should("be.visible").click();
  });
});
