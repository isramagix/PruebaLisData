import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementa eventos de Cypress aquí
    },
    baseUrl: "http://localhost:5173/", // Ajusta esto a la URL de tu aplicación
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Asegúrate de que el patrón coincida con tus archivos de prueba
    supportFile: "cypress/support/e2e.js",
  },
});
