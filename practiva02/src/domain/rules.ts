import type {
  Book,
  Loan,
  LoanStatus
} from "./types.js";

import {
  BookNotFoundError,
  NoCopiesAvailableError
} from "./types.js";

export const DAILY_FINE = 10;

export function availableCopies(
  book: Book,
  loans: Loan[]
): number {
  const activeLoans = loans.filter(
    loan =>
      loan.bookId === book.id &&
      loan.returnedAt === undefined
  ).length;

  return Math.max(
    0,
    book.copies - activeLoans
  );
}

export function lendBook(
  bookId: string,
  books: Book[],
  loans: Loan[],
  today: Date
): Loan {
  const book = books.find(
    book => book.id === bookId
  );

  if (!book) {
    throw new BookNotFoundError();
  }

  if (availableCopies(book, loans) <= 0) {
    throw new NoCopiesAvailableError();
  }

  const dueAt = new Date(today);

  dueAt.setDate(
    dueAt.getDate() + 7
  );

  const loan: Loan = {
    bookId: book.id,
    borrowedAt: new Date(today),
    dueAt
  };

  loans.push(loan);

  return loan;
}

export function getLoanStatus(
  loan: Loan,
  today: Date
): LoanStatus {
  if (loan.returnedAt) {
    return "devuelto";
  }

  if (today > loan.dueAt) {
    return "vencido";
  }

  return "activo";
}

export function lateDays(
  loan: Loan,
  today: Date
): number {
  if (today <= loan.dueAt) {
    return 0;
  }

  const difference =
    today.getTime() -
    loan.dueAt.getTime();

  return Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );
}

export function calculateFine(
  loan: Loan,
  today: Date
): number {
  const status =
    getLoanStatus(loan, today);

  switch (status) {
    case "activo":
      return 0;

    case "devuelto":
      return 0;

    case "vencido":
  return lateDays(loan, today) * DAILY_FINE;

    default: {
      const impossible: never = status;
      return impossible;
    }
  }
}