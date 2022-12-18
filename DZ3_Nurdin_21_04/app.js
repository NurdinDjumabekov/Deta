for (let i = 1; i <= 20; i++) {
  if (i % 2 == 0) {
    console.log("Число чётное : " + i);
  } else {
    console.log("Число ничётное : " + i);
  }
}

///////////////////////////////////////////////////////
let sum = 0;
let input = Number(prompt("Введите число : "));

if (input > 0) {
  while (input > 0) {
    sum += input;
    console.log(sum);
    input = Number(prompt("Введите число : "));
    if (input <= 0) {
      console.log(input);
    }
  }
} else if (input <= 0) {
  console.log(input);
}
