import { readFileSync } from "node:fs";
import type { Book } from "./domain/types.js";

function isBook(value: unknown): value is Book {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (
    !("id" in value) ||
    !("title" in value) ||
    !("author" in value) ||
    !("copies" in value)
  ) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.author === "string" &&
    typeof value.copies === "number" &&
    (!("year" in value) || typeof value.year === "number")
  );
}

export function loadCatalog(): {
  books: Book[];
  discarded: number;
} {
  const path = new URL("./data/catalogo.json", import.meta.url);

  const text = readFileSync(path, "utf8");

  const data: unknown = JSON.parse(text);

  if (!Array.isArray(data)) {
    return {
      books: [],
      discarded: 0
    };
  }

  const books = data.filter(isBook);

  return {
    books,
    discarded: data.length - books.length
  };
}