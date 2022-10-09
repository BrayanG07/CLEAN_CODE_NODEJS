export class Exception extends Error {
  spanishMessage: string // "strictPropertyInitialization": false definir en el tsconfig la siguiente regla para quitar el error que se lanza aqui

  constructor (message?: string) {
    super(message)
  }
}
