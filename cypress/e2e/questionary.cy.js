// Test para el cuestionario

describe("Debería ir a la página principal", () => {
  beforeEach(() => {
    // Visita la página principal
    cy.visit("http://localhost:5173/");
    cy.get("#language-switch").uncheck({ force: true });
  });

  it("Debería mostrar el título en español", () => {
    cy.get("h1").should("have.text", "¡Encuentra tu producto ideal!");
  });
  it("Debería clicar el boton de empezar", () => {
    cy.get("#startBtn").click();
    cy.url().should("include", "/categories");
  });
});

describe("Debería ir a la página de categorías", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/categories");
  });

  it("Debería mostrar el título en español", () => {
    cy.get("h1").should("have.text", "Categorías");
  });
  it("Debería clicar en una categoría", () => {
    cy.get("#option").first().click();
    cy.get("#option").first().should("be.checked");
    cy.window().then((win) => {
      win.localStorage.setItem("category", "1");
    });
    cy.get("#nextBtn").click();
    cy.url().should("include", "/subcategories");
  });
});

describe("Debería ir a la página de subcategorias", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/subcategories");
    cy.window().then((win) => {
      win.localStorage.setItem("category", "1");
    });
  });

  it("Debería mostrar el título en español", () => {
    cy.get("h1").should("have.text", "Subcategorías");
  });
  it("Debería clicar en una subcategoria", () => {
    cy.get("#option").first().click();
    cy.get("#option").first().should("be.checked");
    cy.get("#nextBtn").click();
    cy.url({ timeout: 10000 }).should("include", "/colors");
  });
});

describe("Debería ir a la página de colores", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/colors");
    cy.window().then((win) => {
      win.localStorage.setItem("subcategory", "1");
    });
  });

  it("Debería mostrar el título en español", () => {
    cy.get("h1").should("have.text", "Colores");
  });
  it("Debería clicar en una color", () => {
    cy.get("#option").first().click();
    cy.get("#option").first().should("be.checked");
    cy.get("#nextBtn").click();
    cy.url({ timeout: 10000 }).should("include", "/results");
  });
});

describe("Debería ir a la página de resultados", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/results");

    cy.window().then((win) => {
      win.localStorage.setItem("category", "1");
    });
    cy.window().then((win) => {
      win.localStorage.setItem("subcategory", "1");
    });
    cy.window().then((win) => {
      win.localStorage.setItem("color", "1");
    });
  });
  it("Debería mostrar el título en español", () => {
    cy.get("h1").should("have.text", "Resultados");
  });
  it("Debería mostrar resultados", () => {
    cy.get(".card").should("exist");
  });
});
