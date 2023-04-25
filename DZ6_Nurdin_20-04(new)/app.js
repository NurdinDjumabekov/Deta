const input = document.querySelector("#input_num");
const increment = document.querySelector("#increment");
const decrement = document.querySelector("#decrement");
input.value = 0;
let count = 0;

increment.addEventListener("click", () => {
  count++;
  input.value = count;
  console.log(input.value);
});
/////////////////////////
decrement.addEventListener("click", () => {
  count--;
  input.value = count;
  console.log(input.value);
});
