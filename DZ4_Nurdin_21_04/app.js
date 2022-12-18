// let html = [
//   "div",
//   "h1",
//   "p",
//   "span",
//   "div",
//   "h1",
//   "span",
//   "h2",
//   "h1",
//   "img",
//   "p",
//   "div",
//   "h2",
// ];
// let div = "div";
// let h1 = "h1";
// let p = "p";
// let span = "span";
// let h2 = "h2";
// let img = "img";
// ////////////////////////////////
// let div_sum = 0;
// let h1_sum = 0;
// let p_sum = 0;
// let span_sum = 0;
// let h2_sum = 0;
// let img_sum = 0;

// for (const i of html) {
//   if (i === div) {
//     div_sum += 1;
//   } else if (i === h1) {
//     h1_sum += 1;
//   } else if (i === p) {
//     p_sum += 1;
//   } else if (i === span) {
//     span_sum += 1;
//   } else if (i === h2) {
//     h2_sum += 1;
//   } else if (i === img) {
//     img_sum += 1;
//   }
// }
// console.log("div = " + div_sum);
// console.log("h1 = " + h1_sum);
// console.log("p = " + p_sum);
// console.log("span = " + span_sum);
// console.log("h2 = " + h2_sum);
// console.log("img = " + img_sum);
// const o = {
//   div: div_sum,
//   h1: h1_sum,
//   p: p_sum,
//   span: span_sum,
//   img: img_sum,
// };

// console.log(o);
// let arr = [div_sum, h1_sum, p_sum, span_sum, h2_sum, img_sum];
// let arrAll = arr.sort();
// let arrRevers = arrAll.reverse();
// console.log(arrRevers);

///////////////////////////////////////////////////////////////////////////////////
var array = [
  "div",
  "a",
  "div",
  "p",
  "h2",
  "a",
  "li",
  "h3",
  "h2",
  "div",
  "p",
  "a",
  "div",
  "span",
  "div",
  "ul",
];
var arr = {};
for (var i = 0; i < array.length; i++) {
  var a = array[i];
  if (arr[a]) arr[a] += 1;
  else arr[a] = 1;
}
console.log(arr);
let arrMas = Object.values(arr);
let newArr = Object.keys(arr);
for (let i = 0; i < arrMas.length; i++) {
  newArr[i] = newArr[i] + ": " + arrMas[i];
}
let arrObj = { ...newArr };
console.log(arrObj);
