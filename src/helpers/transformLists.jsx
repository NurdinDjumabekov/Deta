export const transformLists = (list, key1, key2) => {
  const newList = list?.map((i) => ({
    ...i,
    id: i?.[key1],
    name: i?.[key2],
  }));

  return newList;
};

export const extractGuid = (path) => {
  //4FCD92F1-A706-44E5-A9A6-8830D2DDF8E9/ha-proxy => 4FCD92F1-A706-44E5-A9A6-8830D2DDF8E9
  const match = path?.match(/[0-9a-fA-F\-]{36}/);
  return match ? match?.[0] : null;
};
