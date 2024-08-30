//Test para los filtros
describe("Debería ir a la pagina de resultados", () => {
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
  it("Debería mostrar los filtros", () => {
    cy.get("#filters").should("exist");
  });
  it("Debería mostrar los filtros por precio", () => {
    cy.get("#price-0-100").check().should("be.checked");
    cy.get("#price-100-300").check().should("be.checked");
    cy.get("#price-0-100").uncheck().should("not.be.checked");
  });
  it("Debería mostrar los filtros por valoración", () => {
    cy.get("#rating-1").check().should("be.checked");
    cy.get("#rating-2").check().should("be.checked");
    cy.get("#rating-1").uncheck().should("not.be.checked");
  });
  it("Debería mostrar los filtros por stock", () => {
    cy.get("#stock-0-50").check().should("be.checked");
    cy.get("#stock-51-100").check().should("be.checked");
    cy.get("#stock-0-50").uncheck().should("not.be.checked");
  });
  it("Debería mostrar los filtros por envío gratis", () => {
    cy.get("#freeShipping").check().should("be.checked");
    cy.get("#freeShipping").uncheck().should("not.be.checked");
  });

  it("Debería mostrar los productos", () => {
    cy.get("#product-item").should("exist");
  });
  it("Debería mostrar el paginador", () => {
    cy.get("#paginator").should("exist");
  });
});

describe("Debería filtar por precio", () => {
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
  it("Debería filtrar por precio de 0 a 100", () => {
    cy.get("#price-0-100").check();
    cy.get("#product-item").each(($el) => {
      const price = parseFloat(
        $el
          .find("#product-price")
          .text()
          .replace(/[^0-9.,]/g, "")
          .replace("€", "")
      );
      expect(price).to.be.within(0, 100);
    });
  });
  it("Debería filtrar por precio de 100 a 300", () => {
    cy.get("#price-100-300").check();
    cy.get("#product-item").each(($el) => {
      const price = parseFloat(
        $el
          .find("#product-price")
          .text()
          .replace(/[^0-9.,]/g, "")
          .replace("€", "")
      );
      expect(price).to.be.within(100, 300);
    });
  });
});

describe("Debería filtar por valoración", () => {
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
  it("Debería filtrar por al menos 4 estrellas", () => {
    cy.get("#rating-4").check();
    cy.get("#rating-5").check();
    cy.get("#product-item").each(($el) => {
      const stars = $el.find(".star.filled").length;
      expect(stars).to.be.at.least(4);
    });
  });
});

describe("Debería filta por envio gratuito", () => {
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
  it("Debería filtrar por envío gratuito", () => {
    cy.get("#freeShipping").check();
    cy.get("#product-item").each(($el) => {
      const shipping = $el.find("#freeship-text").text();
      expect(shipping).to.contain("Sí");
    });
  });
});

describe("Debería filtar por stock ", () => {
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
  it("Debería filtrar por stock de 51-100 unidades", () => {
    cy.get("#stock-51-100").check();
    cy.get("#product-item").each(($el) => {
      const stock = parseInt($el.find(".card-text").text().match(/\d+/)[0]);
      expect(stock).to.be.within(51, 100);
    });
  });
});
describe("Debería filtrar con el dropdown ", () => {
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
  it("Debería existir el dropdown", () => {
    cy.get("#sortOrder").should("exist");
  });
  it("Debería iniciarse con el orden por valoración", () => {
    cy.get("#sortOrder").should("have.value", "rating");
  });
  it("Debería ordenar por precio ascendente", () => {
    cy.get("#sortOrder").select("price-asc");
    cy.get("#sortOrder").should("have.value", "price-asc");
    cy.get("#product-item #product-price").then(($prices) => {
      const prices = $prices
        .map((i, el) =>
          parseFloat(
            Cypress.$(el)
              .text()
              .replace(/[^0-9.,]/g, "")
              .replace(",", ".")
          )
        )
        .get();
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });
  it("Debería ordenar por precio descendente", () => {
    cy.get("#sortOrder").select("price-desc");
    cy.get("#sortOrder").should("have.value", "price-desc");
    cy.get("#product-item #product-price").then(($prices) => {
      const prices = $prices
        .map((i, el) =>
          parseFloat(
            Cypress.$(el)
              .text()
              .replace(/[^0-9.,]/g, "")
              .replace(",", ".")
          )
        )
        .get();
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });
});
