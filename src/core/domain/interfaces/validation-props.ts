import { TaxId } from './tax-id';

export interface ValidationProps<TEnum = unknown> {
  minAmount?: boolean;
  maxAmount?: boolean;
  minPercent?: boolean;
  maxPercent?: boolean;
  taxId?: boolean | ValidationModel;
  each?:
    | Record<string | number, ValidationProps>
    | ValidationProps[]
    | ValidationModel[];
  email?: boolean;
  enum?: boolean;
  maxLength?: boolean;
  minLength?: boolean;
  maxValue?: boolean;
  minValue?: boolean;
  number?: boolean;
  password?: boolean;
  required?: boolean;
  status?: boolean;
  string?: boolean;
  uuid?: boolean;
  params: {
    taxId?: TaxId;
    enum?: TEnum[];
    maxLength?: number;
    minLength?: number;
    maxValue?: number;
    minValue?: number;
    minAmount?: number;
    maxAmount?: number;
    uuid?: string;
  };
}
export type ValidationModel<T = unknown> = {
  [P in keyof T]: ValidationProps | ValidationModel<T[P]>;
} & Partial<ValidationProps>;
