import React from "react";
import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Card } from "../src/Card.jsx";
import { Page } from "../src/Page.jsx";

const sections = [
  { id: "one", title: "First", body: "The first body." },
  { id: "two", title: "Second", body: "The second body." },
];

test("heldout: a card renders the title it is given", () => {
  const a = renderToStaticMarkup(<Card title="Alpha" />);
  const b = renderToStaticMarkup(<Card title="Beta" />);
  assert.ok(a.includes("Alpha") && !a.includes("Beta"));
  assert.ok(b.includes("Beta") && !b.includes("Alpha"));
});

test("heldout: a card renders its children", () => {
  const html = renderToStaticMarkup(<Card title="T"><p>the child</p></Card>);
  assert.ok(html.includes("<p>the child</p>"));
});

test("heldout: the page renders one card per section, in order", () => {
  const html = renderToStaticMarkup(<Page sections={sections} />);
  const first = html.indexOf("First");
  const second = html.indexOf("Second");
  assert.ok(first !== -1 && second !== -1 && first < second);
  assert.equal((html.match(/<article/g) || []).length, 2);
});

test("heldout: the page passes each section's title down", () => {
  const html = renderToStaticMarkup(<Page sections={[{ id: "x", title: "Only", body: "b" }]} />);
  assert.ok(html.includes("Only"));
  assert.ok(html.includes("b"));
});

test("heldout: an empty sections array renders an empty main", () => {
  const html = renderToStaticMarkup(<Page sections={[]} />);
  assert.equal(html, "<main></main>");
});

test("heldout: props are not mutated", () => {
  const props = Object.freeze({ title: "Frozen" });
  assert.doesNotThrow(() => renderToStaticMarkup(<Card {...props} />));
});

test("heldout: two pages with different data differ (no module state)", () => {
  const a = renderToStaticMarkup(<Page sections={[{ id: "a", title: "AAA", body: "1" }]} />);
  const b = renderToStaticMarkup(<Page sections={[{ id: "b", title: "BBB", body: "2" }]} />);
  assert.notEqual(a, b);
});

test("heldout: text is escaped", () => {
  const html = renderToStaticMarkup(<Card title="<script>" />);
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;script&gt;"));
});

test("heldout: a card works standalone", () => {
  const html = renderToStaticMarkup(<Card title="Alone"><span>x</span></Card>);
  assert.ok(html.startsWith("<article"));
  assert.ok(html.includes("<h2>Alone</h2>"));
  assert.ok(html.includes("<span>x</span>"));
});

test("heldout: a card composes inside another card", () => {
  const html = renderToStaticMarkup(
    <Card title="Outer"><Card title="Inner"><em>deep</em></Card></Card>
  );
  assert.ok(html.includes("<h2>Outer</h2>"));
  assert.ok(html.includes("<h2>Inner</h2>"));
  assert.ok(html.includes("<em>deep</em>"));
});
