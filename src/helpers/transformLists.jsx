export const transformLists = (list, key1, key2) => {
  const newList = list?.map((i) => ({
    ...i,
    id: i?.[key1],
    name: i?.[key2],
  }));

  return newList;
};
