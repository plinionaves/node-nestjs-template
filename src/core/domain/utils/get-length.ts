export const getLength = <T>(value: T): number => {
  if (
    value === null ||
    value === undefined ||
    ['bigint', 'boolean', 'function', 'number', 'symbol'].includes(typeof value)
  ) {
    return 0;
  }

  if (Array.isArray(value)) {
    return value.length;
  }

  if (typeof value === 'object') {
    return Object.keys(value as object).length;
  }

  return String(value).length;
};
