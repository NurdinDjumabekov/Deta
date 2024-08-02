export const percentNums = (onePer, allPer) => {
  /// беру число и все 100% и смотрю сколько это число в процентах от 100%
  const percentage = (+onePer / +allPer) * 100;
  return percentage.toFixed(2);
};
