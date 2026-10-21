import React from "react";
import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Page } from "../src/Page.jsx";

test("the page renders the content twice", () => {
  const html = renderToStaticMarkup(<Page />);
  const matches = html.match(/Zero to Hero/g) || [];
  assert.equal(matches.length, 2);
});

test("the page is a main element with cards", () => {
  const html = renderToStaticMarkup(<Page />);
  assert.ok(html.startsWith("<main>"));
  assert.ok(html.includes("<article"));
});
