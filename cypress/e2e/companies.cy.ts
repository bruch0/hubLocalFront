/// <reference types="cypress" />
import faker from "faker";

describe("Login Page", () => {
  it("Should redirect to the login page if not logged in", () => {
    cy.visit("http://localhost:3000/companies");
    cy.url().should("equal", "http://localhost:3000/");
    cy.contains("Faça login novamente").should("be.visible");
  });

  it("Should display the page, add a company, display the table, edit a company, check company locals and delete the company", () => {
    cy.login();

    cy.contains("Minhas Empresas").should("be.visible");
    cy.contains("Nenhuma empresa cadastrada!").should("be.visible");
    cy.contains("Adicionar Empresa").should("be.visible").click();

    cy.get("svg").should("be.visible").click({ multiple: true, force: true });
    cy.contains("Nome").next().should("not.be.visible");
    cy.contains("Website").next().should("not.be.visible");
    cy.contains("CNPJ").next().should("not.be.visible");

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
    cy.contains("Empresa cadastrada").should("be.visible").click();

    cy.contains("Empresa").should("be.visible");
    cy.contains("Qt de Locais").should("be.visible");
    cy.contains("Ações").should("be.visible");
    cy.contains("Página").should("be.visible");
    cy.contains("Qt por página").should("be.visible");
    cy.contains("Anterior").should("be.visible");
    cy.contains("Próxima").should("be.visible");

    const newCompanyName = faker.company.companyName();
    cy.get("td").find("svg").first().should("be.visible").click();
    cy.contains("Editar:").should("be.visible").click();
    cy.contains("Nome")
      .next()
      .should("be.visible")
      .clear()
      .type(newCompanyName);
    cy.contains("Website").next().should("be.visible");
    cy.contains("CNPJ").next().should("be.visible");
    cy.get("form").find("button").should("be.visible").click();
    cy.contains(newCompanyName).should("be.visible");

    cy.get("td").find("svg").eq(1).should("be.visible").click();
    cy.contains("Minhas Empresas").should("be.visible");
    cy.contains("Nenhum local cadastrado!").should("be.visible");
    cy.contains("Adicionar Local").should("be.visible");
    cy.get("a").should("be.visible").click();

    cy.get("td").find("svg").eq(2).should("be.visible").click();
    cy.contains(
      `A empresa ${newCompanyName} será excluída. Tem certeza dessa ação?`
    ).should("be.visible");

    cy.get("form").find("button").should("be.visible").click();
    cy.contains("Empresa excluída").should("be.visible");
  });
});
