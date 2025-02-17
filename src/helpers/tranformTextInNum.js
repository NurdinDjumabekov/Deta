export const tranformTextInNum = (text) => {
  ///// убираю все текста и возвращаю num

  ///// delete

  const num = text?.replace(/[^\d.]/g, "");
  return num;
};
