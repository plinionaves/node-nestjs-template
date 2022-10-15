interface ArraysDiff<T> {
  keptItems: T[];
  newItems: T[];
  removedItems: T[];
}

const checkEquality = <T>(
  itemOne: any,
  itemTwo: any,
  itemProp: keyof T | null,
): boolean =>
  typeof itemProp === 'string'
    ? itemOne[itemProp] === itemTwo[itemProp]
    : itemOne === itemTwo;

export const getArraysDiff = <T = unknown>(
  newList: T[],
  oldList: T[],
  itemProp: keyof T | null = null,
): ArraysDiff<T> => {
  const newItems: T[] = newList.filter(
    (newItem) =>
      !oldList.some((oldItem) => checkEquality(newItem, oldItem, itemProp)),
  );
  const removedItems: T[] = oldList.filter(
    (oldItem) =>
      !newList.some((newItem) => checkEquality(newItem, oldItem, itemProp)),
  );
  const newAndRemovedItems: T[] = [...newItems, ...removedItems];
  const keptItems: T[] = newList.filter(
    (newItem) =>
      !newAndRemovedItems.some((newAndRemovedItem) =>
        checkEquality(newItem, newAndRemovedItem, itemProp),
      ),
  );

  return { keptItems, newItems, removedItems };
};
