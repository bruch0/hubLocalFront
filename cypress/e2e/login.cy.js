/// <reference types="cypress" />
import faker from "faker";

describe("Login Page", () => {
  it("Should render all the fields properly", () => {
    cy.visit("http://localhost:3000");

    cy.get("img").should("be.visible");
    cy.contains("Junte-se a vários clientes satisfeitos.").should("be.visible");
    cy.contains(
      "Cliente HubLocal ganha mais relevância, autoridade e visibilidade. Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!"
    ).should("be.visible");

    cy.get("[type='text']").should("be.visible");
    cy.get("[type='password']").should("be.visible");
    cy.contains("LOGAR").should("be.visible");
    cy.get("a").should("be.visible");
  });

  it("Should render errors when submitting invalid form", () => {
    cy.visit("http://localhost:3000");

    cy.get("[type='text']").type("email invalido");
    cy.contains("LOGAR").click();
    cy.contains("Insira um email válido").should("be.visible");

    cy.get("[type='text']").clear().type(faker.internet.email());
    cy.contains("LOGAR").click();
    cy.contains("Insira sua senha").should("be.visible");
  });

  it("Should render errors toast", () => {
    cy.visit("http://localhost:3000");

    cy.get("[type='text']").clear().type(faker.internet.email());
    cy.get("[type='password']").type(faker.internet.password());
    cy.contains("LOGAR").click();
    cy.contains("Email não registrado").should("be.visible");
  });

  it("Should render success toast and redirect to companies page", () => {
    cy.visit("http://localhost:3000/register");

    const email = faker.internet.email();
    const password = `${faker.lorem.word(8)}${faker.datatype.number(1)}!A`;

    cy.contains("Nome").next().type(faker.name.findName());
    cy.contains("Email").next().type(email);
    cy.contains("Senha").next().type(password);
    cy.contains("Repetir Senha").next().type(password);

    cy.contains("REGISTRAR").click();
    cy.url().should("equal", "http://localhost:3000/");
    cy.contains("Conta criada com sucesso").click();
    cy.wait(1000);

    cy.get("[type='password']").type(password);
    cy.contains("LOGAR").click();

    cy.contains("Logado com sucesso").should("be.visible");
    cy.url().should("equal", "http://localhost:3000/companies");
  });

  it("Should redirect to register page", () => {
    cy.visit("http://localhost:3000");

    cy.get("a").should("be.visible").click();

    cy.url().should("equal", "http://localhost:3000/register");
  });
});
