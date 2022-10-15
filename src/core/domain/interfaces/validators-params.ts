export interface ValidatorsParams<TEnum = unknown> {
  enum: TEnum[];
  minAmount?: number;
  maxAmount?: number;
  minLength?: number;
  maxLength?: number;
  minPercent?: number;
  maxPercent?: number;
  minValue?: number;
  maxValue?: number;
}
