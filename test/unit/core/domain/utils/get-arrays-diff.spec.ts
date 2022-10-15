import { getArraysDiff } from '@/core/domain/utils';

describe('getArraysDiff', () => {
  test('should return the correct diffs for primitive values', () => {
    const newList = [1, 2, 4, 7, 8, 10];
    const oldList = [0, 1, 2, 3, 9, 10, 11, 17];

    const diff = getArraysDiff(newList, oldList);

    expect(diff.newItems).toEqual([4, 7, 8]);
    expect(diff.removedItems).toEqual([0, 3, 9, 11, 17]);
    expect(diff.keptItems).toEqual([1, 2, 10]);
  });

  test('should return the correct diffs for objects', () => {
    const newList = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 6 },
      { value: 9 },
      { value: 10 },
    ];
    const oldList = [
      { value: 0 },
      { value: 1 },
      { value: 2 },
      { value: 4 },
      { value: 5 },
      { value: 7 },
    ];

    const diff = getArraysDiff(newList, oldList, 'value');

    expect(diff.newItems).toEqual([
      { value: 3 },
      { value: 6 },
      { value: 9 },
      { value: 10 },
    ]);
    expect(diff.removedItems).toEqual([
      { value: 0 },
      { value: 4 },
      { value: 5 },
      { value: 7 },
    ]);
    expect(diff.keptItems).toEqual([{ value: 1 }, { value: 2 }]);
  });
});
