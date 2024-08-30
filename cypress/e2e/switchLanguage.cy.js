// Test para el cambio de idioma
describe("Debería iniciarse en español", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Debería mostrar el título en español", () => {
    cy.get("h1").should("have.text", "¡Encuentra tu producto ideal!");
  });
  it("Debería mostrar el botón de cambiar idioma", () => {
    cy.get("#language-switch").should("exist");
  });
  it("Debería cambiar a inglés", () => {
    cy.get("#language-switch").click();
    cy.get("h1").should("have.text", "Find your ideal product!");
  });
});
