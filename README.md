
## Country Search Challenge
Prueba Técnica - Desarrollador Frontend Web Components
## Descripcion
Desarrollo de un buscador de países utilizando **LitElement**, la idea es construir una aplicación basada en Web Components que consuma la API de REST Countries: "https://restcountries.com/", de manera que el usuario pueda explorar, filtrar y consultar el detalle de cada país.
## Primeros pasos
Para empezar a trabajar con este proyecto, empezamos ingresando los siguientes comandos por consola:

```bash
npm install
npm run start
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors

## Estructura del proyecto
```
src/
├── api/
│   ├── requests.js      → fetch centralizado, headers, errores
├── components/
│   ├── data-manager/
│   │   └── country-explorer/
│   │       └── country-explorer.js   → componente manager / DM
│   └── ui/
│       ├── country-search/
│           └── country-search.js   → componente de busqueda / UI
│       ├── country-list/
│           └── country-list.js   → componente lista países / UI
│       └── country-detail/
│           └── country-detail.js   → componente lista detalle de país / UI
├── styles/
│   └── country-explorer-styles.css         → Estilos globales
test/
├── country-list.test.js
└── country-search.test.js
```
## Decisión:
Para justificar la decisión sobre el límite de resultados en el componente **country-list**, se tomó como base el principio de Responsabilidad Única (SRP).
Cada componente debe tener un único proposito en el sistema o proyecto. En este caso, el componente **country-list** es responsable de la presentación de los datos, a diferencia del componente country-explorer que se encarga de la obtención y gestión de la información.

Si el límite de resultados se gestionara desde el componente padre, este asumiría múltiples responsabilidades, rompiendo la separación de responsabilidades, aumentando el acoplamiento y dificultando el mantenimiento del código.

## Uso de IA
La inteligencia artificial fue empleada como herramienta de apoyo en aspectos específicos del desarrollo, tales como la implementación de patrones de código repetitivos, la adaptación de estilos y la consulta sobre el comportamiento de tecnologías que requerían mayor profundización. El resto de decisiones se tomaron de forma independiente. En este sentido, se utilizó principalmente como un mecanismo de validación y contraste, más que como una fuente principal de desarrollo.

## Justificación de uso de Lit
Se eligió **LitElement** principalmente por su sistema de reactividad declarativo. Esto representa una ventaja clara frente a los Web Components nativos, donde esa reactividad debe implementarse desde cero.

No optaría por **LitElement** en aplicaciones con interacciones dinámicas, donde se requiera un control más preciso sobre el renderizado y el rendimiento, como en el caso de dashboards con actualizaciones constantes de información. En estos casos, se optarían por herramientas que ofrezcan un mayor control sobre el estado y el renderizado, como los frameworks más utilizados en la actualidad, de manera que se pueda facilitar el desarrollo. 

