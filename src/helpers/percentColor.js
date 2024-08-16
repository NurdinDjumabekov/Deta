export const percentColor = (percentNum) => {
  /// в зависимости от процента возвращаю цвет
  const numericPercent = +percentNum?.replace("%", "");

  const num = +numericPercent?.toFixed(0);

  let color = "";
  if (num < 60) {
    color = "#4bc277";
  } else if (num >= 60 && num < 80) {
    color = "#f17600";
  } else {
    color = "#e93b3b";
  }
  return color;
};
