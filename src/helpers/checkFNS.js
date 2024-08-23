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
];

export const checkDomainName = (value) => {
  // Регулярное выражение для проверки
  const listTextDots = value?.split(".");
  const listText_ = value?.split("-");

  if (value?.[0] == "." || value?.[0] == "-") {
    myAlert("Домен не может начинаться со знаков - или . ");
    return true;
  }

  if (listTextDots?.length > 2) {
    myAlert("Домен должен состоять из одной точки!");
    return true;
  }

  if (listTextDots?.length == 0 || listTextDots?.[0] == "") {
    myAlert("Домен пустой!");
    return true;
  }

  if (/[-]\./.test(value) || /\.[-]/.test(value)) {
    myAlert("Запрещены комбинации ' -. ' или ' .- ' в домене.");
    return true;
  }

  if (/--|\.\./.test(value)) {
    myAlert("Запрещено использовать двойные тире или двойные точки.");
    return true;
  }

  if (!ccTLDs?.includes(listTextDots?.[1]) || listTextDots?.length == 1) {
    myAlert("Введите правильный домен верхнего уровня");
    return true;
  }

  if (listText_?.length > 2) {
    myAlert("Домен должен состоять из двух слов");
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
  const validText = /^[a-z0-9.-]*$/.test(value);
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
};

export const checkSubDomainName = (value, activeDns) => {
  const dnsName = activeDns?.name;
  ///// тут хранится наимнование активного домена

  const dnsLength = activeDns?.name?.length;

  const lastText = value?.slice(-dnsLength);

  // Регулярное выражение для проверки
  const listTextDots = value?.split(".");

  if (value.includes(" ")) {
    myAlert("Ошибка! Уберите все лишние отступы!");
    return true;
  }

  if (!value.includes(dnsName)) {
    myAlert("Ошибка! Введите наименование правильного домена!");
    return true;
  }

  if (lastText != dnsName) {
    myAlert(`Ошибка! Домен ${dnsName} должен быть в конце!`);
    return true;
  }

  if (/[-]\./.test(value) || /\.[-]/.test(value)) {
    myAlert("Запрещены комбинации ' -. ' или ' .- ' в субдомен.");
    return true;
  }

  if (/--|\.\./.test(value)) {
    myAlert("Запрещено использовать двойные тире или двойные точки.");
    return true;
  }

  if (listTextDots?.length == 0 || listTextDots?.[0] == "") {
    myAlert("Субдомен пустой!");
    return true;
  }

  if (value?.[0] == "." || value?.[0] == "-") {
    myAlert("Субдомен не может начинаться со знаков - или . ");
    return true;
  }

  if (listTextDots?.length > 3) {
    myAlert("Субдомен должен состоять из двух точек!");
    return true;
  }

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
    myAlert("Заполните 'Record TTL'!");
  }

  if (value?.length >= 1 && value?.[0] == 0) {
    myAlert("Поле 'Record TTL' не может начинаться с '0'");
  }

  return false;
};

export const checkChangeSDF = (value) => {
  const validText = /^[a-zA-Z0-9._\-!?]*$/.test(value);
  return validText;
};
