import { myAlert } from "./MyAlert";
import { serachNameDomen } from "./searchFNS";

///////////////////////////////////////// domen

const ccTLDs = [
  "ru",
  "ua",
  "by",
  "kz",
  "uz",
  "tj",
  "kg",
  "am",
  "az",
  "md",
  "ge",
  "com",
  "eu",
  "xyz",
];

export const checkDomainName = (value) => {
  // Регулярное выражение для проверки
  const listTextDots = value?.split(".");
  const listText_ = value?.split("-");

  if (value?.[0] == "." || value?.[0] == "-") {
    myAlert("Домен не может начинаться со знаков - или . ", "error");
    return true;
  }

  if (listTextDots?.length > 3) {
    myAlert("Домен должен состоять максимум из 2х точек!", "error");
    return true;
  }

  if (listTextDots?.length == 0 || listTextDots?.[0] == "") {
    myAlert("Домен пустой!", "error");
    return true;
  }

  if (/[-]\./.test(value) || /\.[-]/.test(value)) {
    myAlert("Запрещены комбинации ' -. ' или ' .- ' в домене.", "error");
    return true;
  }

  if (/--|\.\./.test(value)) {
    myAlert("Запрещено использовать двойные тире или двойные точки.", "error");
    return true;
  }

  if (
    !ccTLDs?.includes(listTextDots?.[listTextDots?.length - 1]) ||
    listTextDots?.length == 1
  ) {
    myAlert("Введите правильный домен верхнего уровня", "error");
    return true;
  }

  if (listText_?.length > 2) {
    myAlert("Домен должен состоять из двух слов", "error");
    return true;
  }

  return false;
};

export const checkIP = (text) => {
  const listText = text?.split(".");
  const sortList = listText?.filter((i) => i !== "");
  const check = sortList?.length === 4;
  return !check;
};

export const checkChangeRecordName = (value) => {
  const validText = /^[a-z0-9._-]*$/.test(value);
  return validText;
};

export const checkChangeTTL = (value) => {
  ///// проверка при введении текста
  const validTtl = /^\d*$/.test(value);
  return validTtl;
};

export const checkChangeIP = (value) => {
  ///// проверка при введении текста
  const validIp = /^[0-9.]*$/.test(value);
  return validIp;
};

////////////////////////////////////////////// subDomen

export const checkChangePointToName = (value) => {
  const validText = /^[a-zA-Z0-9А-Яа-я.-_]*$/.test(value);
  return validText;
}; //// delete

export const checkSubDomainName = (value, activeDns) => {
  const dnsName = activeDns?.name;
  ///// тут хранится наимнование активного домена

  const lastText = value?.slice(-1);

  // Регулярное выражение для проверки
  const listTextDots = value?.split(".");

  if (value.includes(" ")) {
    myAlert("Ошибка! Уберите все лишние отступы!", "error");
    return true;
  }

  if (lastText == "-") {
    myAlert("Ошибка! Уберите все лишние знаки в конце!", "error");
    return true;
  }

  if (value?.includes(dnsName)) {
    myAlert("Ошибка! Вы два раза ввели наименование домена!", "error");
    return true;
  }

  // if (value.includes(".")) {
  //   myAlert(`Ошибка! В субдомене не должно быть точки!`, "error");
  //   return true;
  // }

  if (/[-]\./.test(value) || /\.[-]/.test(value)) {
    myAlert("Запрещены комбинации ' -. ' или ' .- ' в субдомен.", "error");
    return true;
  }

  if (/--|\.\./.test(value)) {
    myAlert("Запрещено использовать двойные тире или двойные точки.", "error");
    return true;
  }

  // if (listTextDots?.length == 0 || listTextDots?.[0] == "") {
  //   myAlert("Субдомен пустой!", "error");
  //   return true;
  // }

  if (value?.[0] == "." || value?.[0] == "-") {
    myAlert("Субдомен не может начинаться со знаков - или . ", "error");
    return true;
  }

  if (value?.[value.length - 1] === ".") {
    myAlert("В субдомене не должно быть в конце точки(.)", "error");
    return true;
  }

  // if (listTextDots?.length > 3) {
  //   myAlert("Субдомен должен состоять из двух точек!", "error");
  //   return true;
  // }

  ///////////////////////////////////

  //   if (!ccTLDs?.includes(listTextDots?.[1]) || listTextDots?.length == 1) {
  //     myAlert("Введите правильный домен верхнего уровня");
  //     return true;
  //   }

  //   if (listText_?.length > 2) {
  //     myAlert("Домен должен состоять из двух слов");
  //     return true;
  //   }

  return false;
};

export const checkTTL = (value) => {
  if (value?.length === 0 || value == 0) {
    myAlert("Заполните 'Record TTL'!", "error");
  }

  if (value?.length >= 1 && value?.[0] == 0) {
    myAlert("Поле 'Record TTL' не может начинаться с '0'", "error");
  }

  return false;
};

export const checkChangeSDF = (value) => {
  const validText = /^[a-zA-Z0-9._\-!?]*$/.test(value);
  return validText; //// delete
};
