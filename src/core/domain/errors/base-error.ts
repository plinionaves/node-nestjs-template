export class BaseError<T> extends Error {
  constructor(public code: string, public params: Record<keyof T, any>) {
    super(code);

    this.name = 'BaseError';
  }
}
