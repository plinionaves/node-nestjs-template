export const validateRequired = <T>(value: T): boolean => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  // invalid date won't pass
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  if (typeof value === 'object') {
    // eslint-disable-next-line no-unreachable-loop
    for (const _ in value) return true;
    return false;
  }

  return !(String(value).trim().length === 0);
};
