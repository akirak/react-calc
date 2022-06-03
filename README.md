# React Calculator

This is a simple calculator application built with React and Vite.

- React
- TypeScript
- Vite
- Testing with Vitest
- Tailwind CSS

The calculation logic is put in [a single module](./src/Reducer.ts) which exposes only a single `reduce` function (and types), which is called from `useReducer` hook of React. It is a pure function, so it is easy to [test](./test/reducer.test.ts).
