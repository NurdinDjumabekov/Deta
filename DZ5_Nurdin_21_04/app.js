// function revers() {
//   let word_1 = prompt("Введите какое-то слово : ");
//   let word_2 = "";
//   let len = word_1.length - 1;
//   for (let j = len; j >= 0; j--) {
//     word_1[j];
//     word_2 = word_2 + word_1[j];
//   }
//   alert(word_2);
// }
// revers();

//////////////////////////////////////////////////////////////////////
// работает толлко с полодительными числами
// первый вариант

// function numbers() {
//   let sum = 0;
//   let input = 1;
//   let koll = 0;
//   while (input > 0) {
//     input = Number(
//       prompt("Введите число!!! (Только чтобы число было положительным)")
//     );
//     sum += input;
//     koll += 1;
//     let average = sum / koll;
//     console.log("Сумма чисел :  " + sum);
//     console.log("Количество цифр : " + koll);
//     console.log("Среднее арифмитическое " + average);
//   }
// }

// numbers();

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////
// второй вариант

// var srednee = function () {
//   var sum = 0;
//   for (var i = 0; i < arguments.length; i++) sum += arguments[i];
//   return sum / arguments.length;
// };
// console.log(srednee(1, 5, 7, 4));
