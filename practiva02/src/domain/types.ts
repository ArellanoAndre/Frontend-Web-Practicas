export interface Book {
  readonly id: string;
  title: string;
  author: string;
  copies: number;
  year?: number;
}

export type LoanStatus =
  | "activo"
  | "devuelto"
  | "vencido";

export interface Loan {
  bookId: string;
  borrowedAt: Date;
  dueAt: Date;
  returnedAt?: Date;
}

export class BookNotFoundError extends Error {
  constructor() {
    super("El libro no existe.");
    this.name = "BookNotFoundError";
  }
}

export class NoCopiesAvailableError extends Error {
  constructor() {
    super("No hay ejemplares disponibles.");
    this.name = "NoCopiesAvailableError";
  }
}