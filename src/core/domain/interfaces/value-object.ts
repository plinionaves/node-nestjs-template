import { ValidationProps } from './validation-props';

export interface ValueObject<TValue> {
  errors: ValidationProps;
  isValid: boolean;
  value: TValue;
}

export interface ValueObjectOptions {
  skipFullCheck?: boolean;
}
