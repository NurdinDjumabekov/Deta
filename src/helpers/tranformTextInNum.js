export const tranformTextInNum = (text) => {
  ///// убираю все текста и возвращаю num

  ///// delete

  const num = text?.replace(/[^\d.]/g, "");
  return num;
};

export const tranformKey = (name, list) => {
  ///// перезаписываю ключи для массивов
  const newList = list?.map((item) => {
    return { name: item?.[name], count: item?.vmCount };
  });

  return newList;
};
