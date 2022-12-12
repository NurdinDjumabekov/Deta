const films = {
  name: "Harry Potter",
  releaseDate: "20.07.2002",
  mainActor: "Daniel Radcliffe",
  episodes: 7,
  herois: "Hermione Granger,Ronald Weasley",
  nameEpisodes: {
    episod1: "Harry Potter and the Philosopher's Stone",
    episod2: "Harry Potter and the Chamber of Secrets",
    episod3: "Harry Potter and the Prisoner of Azkaban",
    episod4: "Harry Potter and the Goblet of Fire",
    episod5: "Harry Potter and the Order of the Phoenix",
    episod6: "Harry Potter and the Half-Blood Prince",
    episod7: "Harry Potter and the Deathly Hallows",
    wands: {
      wand: "elderberry",
    },
  },
};
console.log(
  "Фильм : " +
    films.name +
    "\n" +
    "Количество эпизодов: " +
    films.episodes +
    "\n" +
    "Был выпущен: " +
    films.releaseDate +
    "\n" +
    "Главный актер: " +
    films.mainActor
);
console.log(
  "Второстепенные персонажи:  " +
    films.herois +
    "\n" +
    "Название 1 эпизода: " +
    films.nameEpisodes.episod1 +
    "\nСамая сильная палочка: " +
    films.nameEpisodes.wands.wand
);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let day = prompt("введите день недели: ");
switch (day) {
  case "monday":
  case "Monday":
    console.log("Понедельник");
    break;
  case "tuesday":
  case "Tuesday":
    console.log("Вторник");
    break;
  case "wednesday":
  case "Wednesday":
    console.log("Среда");
    break;
  case "thursday":
  case "Thursday":
    console.log("Четверг");
    break;
  case "friday":
  case "Friday":
    console.log("Пятница");
    break;
  case "saturday":
  case "Saturday":
    console.log("Суббота");
    break;
  case "sunday":
  case "Sunday":
    console.log("Воскресенье");
    break;
  default:
    console.log("Error");
}
