var parol = "12345";
console.log(name, surname, otchesv);
var name1 = prompt("введите ваше имя");
var surname = prompt("введите вашу фамилию");
var otchesv = prompt("введите ваше отчество");
var parol1 = prompt("введите пароль");
if (parol === parol1) {
  alert("Добро пожаловать : " + name1 + " " + surname + " " + otchesv);
} else {
  alert("ваш пароль не верный");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

var day = Number(prompt("ввведите день сваего рождения"));
var month = Number(prompt("ввведите мецяс сваего рождения"));
if (isNaN(day)) alert("неправильные данные");
else if (day <= 31 || day >= 1) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
    alert("овен");
  } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
    alert("телец");
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
    alert("близнецы");
  } else if ((month === 6 && day >= 22) || (month === 7 && day <= 21)) {
    alert("рак");
  } else if ((month === 7 && day >= 22) || (month === 8 && day <= 23)) {
    alert("лев");
  } else if ((month === 8 && day >= 24) || (month === 9 && day <= 22)) {
    alert("дева");
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    alert("весы");
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 22)) {
    alert("скорпион");
  } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
    alert("стрелец");
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) {
    alert("Козерог");
  } else if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) {
    alert("водолей");
  } else if (
    (month === 2 && day >= 19 && day <= 29) ||
    (month === 3 && day <= 20)
  ) {
    alert("рыбы");
  } else {
    alert("error");
  }
} else {
  alert("error");
}
