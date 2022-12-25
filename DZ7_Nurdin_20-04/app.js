const inputLeft = document.querySelector("#num_one");
const inputRight = document.querySelector("#num_two");
const buttonPlus = document.querySelector("#button_calculator_1");
const buttonMinus = document.querySelector("#button_calculator_2");
const buttonDivision = document.querySelector("#button_calculator_3");
const buttonMultiplication = document.querySelector("#button_calculator_4");
const output = document.querySelector("span");
const restart = document.querySelector("#restart");

buttonPlus.addEventListener("click", () => {
  let sumPlus = Number(inputLeft.value) + Number(inputRight.value);
  output.innerText = sumPlus;
});

buttonMinus.addEventListener("click", () => {
  let sumMinus = Number(inputLeft.value) - Number(inputRight.value);
  output.innerText = sumMinus;
});

buttonDivision.addEventListener("click", () => {
  let sumDivision = Number(inputLeft.value) / Number(inputRight.value);
  output.innerText = sumDivision;
});

buttonMultiplication.addEventListener("click", () => {
  let sumMultiplication = Number(inputLeft.value) * Number(inputRight.value);
  output.innerText = sumMultiplication;
});
restart.addEventListener("click", () => {
  inputLeft.value = "";
  inputRight.value = "";
  output.innerText = "0";
});
