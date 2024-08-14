export const transformListNetwork = (list, targetObj) => {
  //// беру список с вложенными массивом и возвращаю тот же массив,
  //// но уже с новым обьектом, щаменив старый если у них похожи guid
  const { guid_network, guid } = targetObj;

  // Проходим по всему массиву list
  return list?.map((mainObj) => {
    // Если совпадает guid_network, то ищем внутри ips
    if (mainObj?.guid === guid_network) {
      // Проходим по ips и заменяем объект с совпадающим guid
      const updatedList = mainObj?.ips?.map((listObj) => {
        if (listObj?.guid === guid) {
          // Заменяем объект на новый
          return { ...listObj, ...targetObj };
        }
        return listObj;
      });

      // Возвращаем обновленный объект mainObj с новым ips
      return { ...mainObj, ips: updatedList };
    }
    return mainObj;
  });
};
