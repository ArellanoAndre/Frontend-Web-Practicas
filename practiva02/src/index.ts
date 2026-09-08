import { loadCatalog } from "./catalog.js";
import { askText } from "./input.js";

import {
  availableCopies,
  calculateFine,
  lendBook
} from "./domain/rules.js";

import {
  BookNotFoundError,
  NoCopiesAvailableError
} from "./domain/types.js";

import type {
  Loan
} from "./domain/types.js";

const MENU = {
  CATALOG: "1",
  LEND: "2",
  FINE: "3",
  EXIT: "4"
} as const;

type MenuOption =
  typeof MENU[keyof typeof MENU];

const {
  books,
  discarded
} = loadCatalog();

const loans: Loan[] = [];

console.log(
  "\n=== BIBLIOTECA ==="
);

console.log(
  `Registros descartados: ${discarded}`
);

function showCatalog(): void {
  console.log("\n--- CATÁLOGO ---");

  for (const book of books) {
    const available =
      availableCopies(
        book,
        loans
      );

    console.log(
      `${book.id} | ${book.title} | Disponibles: ${available}`
    );
  }
}

function runOption(
  option: MenuOption
): boolean {
  switch (option) {

    case MENU.CATALOG:
      showCatalog();
      return true;

    case MENU.LEND: {
      const id = askText(
        "ID del libro: "
      );

      if (id === undefined) {
        console.log(
          "No se ingresó un ID."
        );

        return true;
      }

      try {
        const loan = lendBook(
          id,
          books,
          loans,
          new Date()
        );

        console.log(
          `Préstamo realizado. Vence: ${loan.dueAt.toLocaleDateString()}`
        );

      } catch (error: unknown) {

        if (
          error instanceof
          BookNotFoundError
        ) {
          console.log(
            error.message
          );

        } else if (
          error instanceof
          NoCopiesAvailableError
        ) {
          console.log(
            error.message
          );

        } else {
          console.log(
            "Error inesperado."
          );
        }
      }

      return true;
    }

    case MENU.FINE: {

      if (loans.length === 0) {
        console.log(
          "No existen préstamos."
        );

        return true;
      }

      const loan = loans[0];

      if (loan === undefined) {
        return true;
      }

      // Se usa una fecha de prueba
      // 3 días después del vencimiento.
      const testDate =
        new Date(loan.dueAt);

      testDate.setDate(
        testDate.getDate() + 3
      );

      const fine =
        calculateFine(
          loan,
          testDate
        );

      console.log(
        `Multa: $${fine}`
      );

      return true;
    }

    case MENU.EXIT:
      return false;

    default: {
      const impossible: never =
        option;

      return impossible;
    }
  }
}

let running = true;

while (running) {

  console.log(`
1. Mostrar catálogo
2. Prestar libro
3. Calcular multa
4. Salir
`);

  const answer = askText(
    "Selecciona una opción: "
  );

  if (
    answer === MENU.CATALOG ||
    answer === MENU.LEND ||
    answer === MENU.FINE ||
    answer === MENU.EXIT
  ) {
    running =
      runOption(answer);

  } else {
    console.log(
      "Opción inválida."
    );
  }
}