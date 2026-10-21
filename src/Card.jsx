import React from "react";
import { content } from "./content.js";

// The starter. It reads the module-level content instead of its props.
export function Card() {
  return (
    <article className="card">
      <h2>{content.title}</h2>
      <p>{content.body}</p>
    </article>
  );
}
