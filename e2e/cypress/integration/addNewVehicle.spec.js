describe("My First Test", () => {
  it('finds the content "type"', () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Dodaj pojazd").click();

    cy.pause();

    cy.get('[name="brand"]').type("testCypress");
    cy.get('[name="model"]').type("modelCypress");
    cy.get('[name="plateNumber"]').type("rejestracjaCyp");
    cy.get('[name="deviceId"]').select("test");
    cy.contains("Submit").click();
  });
});
