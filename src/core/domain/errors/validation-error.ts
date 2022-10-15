import { BaseError } from './base-error';

export class ValidationError<T> extends BaseError<T> {
  constructor(code: string, params: Record<keyof T, any>) {
    super(code, params);

    this.name = 'ValidationError';
  }
}
