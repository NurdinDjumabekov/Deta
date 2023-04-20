// const reverseStr = (...texts) => {
//   let text = "";
//   for (const item of texts) {
//     for (let i = item.length - 1; i >= 0; i--) {
//       text += item[i];
//       if (i === 0) {
//         text = text + ",";
//       }
//     }
//   }
//   text = text.split(",");
//   let deleteElement = text.pop();
//   return console.log(text);
// };

// reverseStr("nurdin", "rus", "kaira", "alisher", "aizhamal");

////////////////////////////////////////////////////////////////////////////////

const numberSum = (...numbers) => {
  let sum = 0;
  numbers.map((num) => {
    sum += num;
  });
  console.log("Среднее арифметическое :", sum / numbers.length);
};
numberSum(5, 5, 5);
