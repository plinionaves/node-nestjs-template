export const validateCNPJ = (value: string | number): boolean => {
  const digits = value.toString().replace(/[\D]/gi, '');
  let dig1 = 0;
  let dig2 = 0;

  const validation = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const digit = parseInt(digits.charAt(12) + digits.charAt(13));

  const getRest = (dig: number): number => (dig % 11 < 2 ? 0 : 11 - (dig % 11));

  validation.forEach((v, i) => {
    dig1 += i > 0 ? +digits.charAt(i - 1) * v : 0;
    dig2 += +digits.charAt(i) * v;
  });

  dig1 = getRest(dig1);
  dig2 = getRest(dig2);

  const isValid = dig1 * 10 + dig2 === digit;

  return isValid;
};
