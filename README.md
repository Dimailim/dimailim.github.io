# Portfolio Site

A bilingual (EN/RU) single-page developer portfolio built with Vue 3.

## Features

- **Bilingual UI (EN/RU)** powered by `vue-i18n`.
- **Light / dark theme** with system-preference detection.
- **Accessible by design** - semantic roles and labels, keyboard-focusable controls.
- **Interactive achievements** - modal dialog with a custom, swipeable carousel.
- **Responsive layout** for desktop and mobile.

## Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Build tool:** Vite
- **i18n:** vue-i18n
- **Unit / integration tests:** Vitest + @vue/test-utils
- **End-to-end tests:** Playwright
- **No router / no store** - shared state is handled with composables.

## Getting Started

**Prerequisites:** Node.js >= 18 and npm.

```bash
# 1. Clone the repository
git clone https://github.com/Dimailim/dimailim.github.io.git
cd ./dimailim.github.io.

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

**Build for production:**

```bash
npm run build      # output to /dist
npm run preview    # serve the production build locally
```

## Testing

The project follows the testing pyramid: unit tests, component
integration tests, end-to-end tests in a real browser.

```bash
npm test                # run unit & integration tests
npm run test:coverage   # run tests with a coverage report
npm run test:e2e        # run end-to-end tests (Playwright)
npm run test:e2e:ui     # run E2E tests in interactive UI mode
```

- **Unit tests** cover the composables (`useTheme`, `useLanguage`, `useIntersectionObserver`).
- **Integration tests** mount each component and verify rendering, i18n, and user interactions.
- **E2E tests** drive the built site in a browser: theme/language switching, navigation, the achievements modal, and skill tooltips.

> Note: before the first E2E run, install the browsers with `npx playwright install`.

## Project Structure

- `src/components` - UI components
- `src/composables` - reusable stateful logic (theme, language, scroll-spy)
- `src/data` - translations (`en`/`ru`)
- `public` - image assets
- `tests` - unit & integration tests (Vitest)
- `e2e` - end-to-end tests (Playwright)