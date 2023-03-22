import faker from "faker";

Cypress.Commands.add("login", () => {
  const email = faker.internet.email();
  const password = `${faker.lorem.word(8)}${faker.datatype.number(1)}!A`;

  cy.visit("http://localhost:3000/register");

  cy.contains("Nome").next().type(faker.name.findName());
  cy.contains("Email").next().type(email);
  cy.contains("Senha").next().type(password);
  cy.contains("Repetir Senha").next().type(password);

  cy.contains("REGISTRAR").click();
  cy.url().should("equal", "http://localhost:3000/");

  cy.get("[type='password']").type(password);
  cy.contains("LOGAR").click();

  cy.url().should("equal", "http://localhost:3000/companies");
});
