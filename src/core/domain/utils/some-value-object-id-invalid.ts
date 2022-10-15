import { ValueObject } from '../interfaces';

export const someValueObjectIsInvalid = (
  valueObjects: Array<ValueObject<any>>,
): boolean => valueObjects.some((valueObject) => !valueObject.isValid);
