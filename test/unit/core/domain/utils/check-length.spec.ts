import { getLength } from '@/core/domain/utils';

describe('getLength', () => {
  test('should return length of 0', () => {
    const zeroLengthValues = [
      null,
      undefined,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      Symbol('55'),
      BigInt(55),
      true,
      false,
      55,
      [],
      {},
    ];

    zeroLengthValues.forEach((value) => expect(getLength(value)).toEqual(0));
  });

  test('should return the correct length', () => {
    expect(getLength('a55')).toEqual(3);
    expect(getLength([0, 1])).toEqual(2);
    expect(getLength({ x: 0, y: 1, z: 1.5 })).toEqual(3);
  });
});
