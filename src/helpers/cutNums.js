export const cutNums = (num, cut) => {
  //// открыгляю до опрделнного числа, число до которго
  //// надо округлить передается во время вызова в cut

  const newNum = +num?.toFixed(cut);
  return +newNum;
};
