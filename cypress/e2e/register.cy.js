/// <reference types="cypress" />
import faker from "faker";

describe("Login Page", () => {
  it("Should render all the fields properly", () => {
    cy.visit("http://localhost:3000/register");

    cy.get("img").should("be.visible");
    cy.contains("Junte-se a vários clientes satisfeitos.").should("be.visible");
    cy.contains(
      "Cliente HubLocal ganha mais relevância, autoridade e visibilidade. Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!"
    ).should("be.visible");

    cy.contains("Nome").next().should("be.visible");
    cy.contains("Email").next().should("be.visible");
    cy.contains("Senha").next().should("be.visible");
    cy.contains("Repetir Senha").next().should("be.visible");
    cy.contains("REGISTRAR").should("be.visible");
    cy.get("a").should("be.visible");
  });

  it("Should render errors when submitting invalid form", () => {
    cy.visit("http://localhost:3000/register");

    cy.contains("REGISTRAR").click();
    cy.contains("Insira seu nome").should("be.visible");

    cy.contains("Nome").next().type(faker.name.findName());
    cy.contains("REGISTRAR").click();
    cy.contains("Insira um email válido").should("be.visible");

    cy.contains("Email").next().type("email inválido");
    cy.contains("REGISTRAR").click();
    cy.contains("Insira um email válido").should("be.visible");

    cy.contains("Email").next().clear().type(faker.internet.email());
    cy.contains("REGISTRAR").click();
    cy.contains(
      "Sua senha deve conter oito caracteres, uma letra maiúscula, uma letra minúscula e um dígito"
    ).should("be.visible");

    cy.contains("Senha").next().type(faker.lorem.word(1));
    cy.contains("REGISTRAR").click();
    cy.contains(
      "Sua senha deve conter oito caracteres, uma letra maiúscula, uma letra minúscula e um dígito"
    ).should("be.visible");

    cy.contains("Senha").next().clear().type(faker.lorem.word(8));
    cy.contains("REGISTRAR").click();
    cy.contains(
      "Sua senha deve conter oito caracteres, uma letra maiúscula, uma letra minúscula e um dígito"
    ).should("be.visible");

    cy.contains("Senha")
      .next()
      .clear()
      .type(`${faker.lorem.word(8)}${faker.datatype.number(1)}`);
    cy.contains("REGISTRAR").click();
    cy.contains(
      "Sua senha deve conter oito caracteres, uma letra maiúscula, uma letra minúscula e um dígito"
    ).should("be.visible");

    const password = `${faker.lorem.word(8)}${faker.datatype.number(1)}!A`;

    cy.contains("Senha").next().clear().type(password);
    cy.contains("REGISTRAR").click();
    cy.contains("Senhas não conferem").should("be.visible");

    cy.contains("Repetir Senha").next().type(password);
  });

  it("Should render success toast, redirect to url and fill email", () => {
    cy.visit("http://localhost:3000/register");

    const email = faker.internet.email();
    const password = `${faker.lorem.word(8)}${faker.datatype.number(1)}!A`;

    cy.contains("Nome").next().type(faker.name.findName());
    cy.contains("Email").next().type(email);
    cy.contains("Senha").next().type(password);
    cy.contains("Repetir Senha").next().type(password);

    cy.contains("REGISTRAR").click();
    cy.url().should("equal", "http://localhost:3000/");
    cy.contains("Conta criada com sucesso").should("be.visible");
    cy.get("[type='text']").should("have.value", email);
  });

  it("Should render error toast when using an already registered email", () => {
    cy.visit("http://localhost:3000/register");

    const email = faker.internet.email();
    const password = `${faker.lorem.word(8)}${faker.datatype.number(1)}!A`;

    cy.contains("Nome").next().type(faker.name.findName());
    cy.contains("Email").next().type(email);
    cy.contains("Senha").next().type(password);
    cy.contains("Repetir Senha").next().type(password);

    cy.contains("REGISTRAR").click();
    cy.url().should("equal", "http://localhost:3000/");
    cy.get("a").should("be.visible").click();

    cy.contains("Nome").next().type(faker.name.findName());
    cy.contains("Email").next().type(email);
    cy.contains("Senha").next().type(password);
    cy.contains("Repetir Senha").next().type(password);
    cy.contains("REGISTRAR").click();
    cy.contains("Email já cadastrado").should("be.visible");
  });

  it("Should redirect to login page", () => {
    cy.visit("http://localhost:3000/register");

    cy.get("a").should("be.visible").click();

    cy.url().should("equal", "http://localhost:3000/");
  });
});
