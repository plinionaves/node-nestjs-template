import { BaseError } from './base-error';

export class NotFoundError<T> extends BaseError<T> {
  constructor(code: string, params: Record<keyof T, any>) {
    super(code, params);

    this.name = 'NotFoundError';
  }
}
