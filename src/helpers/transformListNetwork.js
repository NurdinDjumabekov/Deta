export const transformListNetwork = (list, targetObj) => {
  //// беру список с вложенными массивом и возвращаю тот же массив,
  //// но уже с новым обьектом, щаменив старый если у них похожи guid
  const { guid_network, guid } = targetObj;

  return list?.map((mainObj) => {
    if (mainObj?.guid === guid_network) {
      const updatedList = mainObj?.ips?.map((listObj) => {
        if (listObj?.guid === guid) {
          return { ...listObj, ...targetObj };
        }
        return listObj;
      });
      return { ...mainObj, ips: updatedList };
    }
    return mainObj;
  });
};

export const tranformDataProviders = (list) => {
  ///// для преобразования ключей
  const newList = list?.map((item) => ({
    id: item?.guid,
    name: item?.provider_name,
  }));

  return newList;
};
