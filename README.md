# components-lab

A static page built from React components. No bundler, no dev server: the
tests render the components to static markup.

## Components

### `<Card title="..." >children</Card>`

A card. It renders the `title` it is **given** and its `children` below it.
It must not read module state: two cards with different props must render
different markup.

### `<Page sections={[...]} />`

Renders one `<Card>` per section, in order:

```js
{ id: "one", title: "First", body: "..." }
```

The `title` goes to the card's `title`; the `body` becomes its children. An
empty array renders an empty `<main>`.

## Rules

1. Components are pure functions of their props.
2. Data flows down: a parent passes values to a child, never the reverse.
3. A component never mutates the props object it receives.
4. Composition is `children`, not a `variant` prop with a switch inside.

## Tests

```
npm install
npm test
```
