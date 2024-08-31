# Recomendador de Productos

Este proyecto es un recomendador de productos que realiza un cuestionario interactivo al usuario y, en función de sus respuestas, muestra artículos recomendados. El cuestionario es dinámico y se adapta a las decisiones del usuario. Además, permite el cambio de idioma entre inglés y español y ofrece varios filtros para personalizar los resultados.

![Vista Previa del Proyecto](ImagenesReadme/Home.png)

## Características Principales

- **Cuestionario Dinámico**: Preguntas adaptativas basadas en las respuestas del usuario.
- **Cambio de Idioma**: Interfaz disponible en inglés y español.
- **Filtros Personalizados**: Filtros avanzados para refinar los resultados de búsqueda.

![Cuestionario Dinámico](ImagenesReadme/Form.png)

![Vista de resultados](ImagenesReadme/Results.png)

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalación

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

1. Clona este repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>

   ```

2. Instala las dependencias

   ```bash
   npm install

   ```

3. Crea un archivo .env basado en el de ejemplo y completalo con tus credenciales

   ```bash
   cp .env.example .env
   ```

4. Ejecuta el proyecto en modo desarrollo

   ```bash
   npm run dev

   ```

5. El proyecto tiene test realizados con la librería Cypress, si quieres ejecutarlos debes usar el siguiente comando
   ```bash
   npm run cypress:open
   ```

## Author

- [@Israel Sánchez](https://www.github.com/isramagix)
