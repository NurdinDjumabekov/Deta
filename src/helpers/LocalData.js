import home from "../assets/icons/menu/home.svg";
import microtic from "../assets/icons/menu/router.svg";
import seti from "../assets/icons/menu/wifi.svg";
import HaProxy from "../assets/icons/menu/HaProxy.svg";
import ipAddres from "../assets/icons/menu/ipAddres.svg";
import usersIcon from "../assets/icons/menu/users.svg";
import dns from "../assets/icons/menu/dns.svg";

/////// os
import windows from "../assets/images/OS/windows.png";
import ubuntu from "../assets/images/OS/ubuntu.png";
import freeNas from "../assets/images/OS/freeNas.png";
import freeBSD from "../assets/images/OS/freeBSD.png";
import centos from "../assets/images/OS/centos.png";

export const pages = [
  { id: 1, name: "Главная", path: "/hosts", img: home },
  { id: 2, name: "Микротики", path: "/microtic", img: microtic },
  { id: 4, name: "HaProxy", path: "/ha-proxy", img: HaProxy },
];

export const pagesAllDC = [
  { id: 6, name: "ДНС", path: "/dns", img: dns },
  { id: 3, name: "Сети", path: "/networks", img: seti },
  { id: 5, name: "Статические IP", path: "/ip-addres", img: ipAddres },
];

export const listGr = [
  { name: "Тестовая группa", guid: "asdasdas", count: 12 },
  { name: "ЛИС стационар", guid: "asdasdas", count: 12 },
  { name: "ЛИС облако", guid: "asdasdas", count: 12 },
  { name: "Мис", guid: "asdasdas", count: 12 },
  { name: "Доставка", guid: "asdasdas", count: 12 },
  { name: "FIN", guid: "asdasdas", count: 12 },
  { name: "1C", guid: "asdasdas", count: 12 },
];

export const listname = [
  { name: "Иван", count: 12 },
  { name: "Баатыр", count: 4 },
  { name: "Роза", count: 6 },
  { name: "Айжамал", count: 7 },
  { name: "Эржан", count: 2 },
  { name: "Бек", count: 0 },
];

export const listColor = [
  {
    id: 1,
    num: 23,
    color: "red",
    description: "Сюда входит Акнет",
    status: "Входная группа",
  },
  {
    id: 2,
    num: 42,
    color: "blue",
    description: "Сюда входит Сайма119201",
    status: "Входная группа",
  },
  {
    id: 3,
    num: 35,
    color: "green",
    description: "Сюда входит Сайма127128",
    status: "Входная группа",
  },
  {
    id: 4,
    num: 17,
    color: "yellow",
    description: "Сюда входит Мегалайн",
    status: "Входная группа",
  },
  {
    id: 5,
    num: 56,
    color: "orange",
    description: "Отсюда выходит Акнет",
    status: "Используется",
  },
  {
    id: 6,
    num: 14,
    color: "purple",
    description: "Отсюда выходит Акнет",
    status: "Используется",
  },
  {
    id: 7,
    num: 87,
    color: "pink",
    description: "Отсюда выходит Акнет",
    status: "Используется",
  },
  {
    id: 8,
    num: 29,
    color: "brown",
    description: "Отсюда выходит Акнет",
    status: "Используется",
  },
  {
    id: 9,
    num: 66,
    color: "gray",
    description: "Отсюда выходит Акнет",
    status: "Используется",
  },
  {
    id: 10,
    num: 18,
    color: "cyan",
    description: "Отсюда выходит Сайма119201",
    status: "Завели на свитч",
  },
  {
    id: 11,
    num: 52,
    color: "magenta",
    description: "Отсюда выходит Сайма119201",
    status: null,
  },
  {
    id: 12,
    num: 34,
    color: "lime",
    description: "Отсюда выходит Сайма127128",
    status: "Завели на свитч",
  },
  {
    id: 13,
    num: 76,
    color: "indigo",
    description: "Отсюда выходит Акнет",
    status: "Используется",
  },
  {
    id: 14,
    num: 25,
    color: "violet",
    description: "Отсюда выходит Мегалайн",
    status: "Завели на свитч",
  },
  {
    id: 15,
    num: 44,
    color: "gold",
    description: "Отсюда шнур идет в 5 разъем старого микротика",
    status: "Для Зеркального Бекапа, Дима настраивает",
  },
  {
    id: 16,
    num: 33,
    color: "silver",
    description: "Выходит в 1 порт Свитча",
    status: "Связь между маршрутизатором и свитчом",
  },
];

export const anotherListColor = [
  {
    id: 1,
    num: 19,
    color: "aqua",
    description: "Подключено к сети",
    status: "Активный",
  },
  {
    id: 2,
    num: 28,
    color: "beige",
    description: "Ожидает проверки",
    status: "Неактивный",
  },
  {
    id: 3,
    num: 36,
    color: "coral",
    description: "Сюда входит интернет",
    status: "Входная группа",
  },
  {
    id: 4,
    num: 47,
    color: "fuchsia",
    description: "Отсюда выходит интернет",
    status: "Используется",
  },
  {
    id: 5,
    num: 53,
    color: "lavender",
    description: "Требует обновления",
    status: "Неактивный",
  },
  {
    id: 6,
    num: 67,
    color: "lime",
    description: "Сюда входит соединение",
    status: "Входная группа",
  },
  {
    id: 7,
    num: 72,
    color: "mint",
    description: "Отсюда выходит соединение",
    status: "Используется",
  },
  {
    id: 8,
    num: 81,
    color: "navy",
    description: "Подключено к серверу",
    status: "Активный",
  },
  {
    id: 9,
    num: 93,
    color: "olive",
    description: "Отключено от сети",
    status: "Неактивный",
  },
  {
    id: 10,
    num: 15,
    color: "peach",
    description: "Тестовое подключение",
    status: "Активный",
  },
  {
    id: 11,
    num: 24,
    color: "plum",
    description: "Резервное подключение",
    status: "Входная группа",
  },
  {
    id: 12,
    num: 38,
    color: "rose",
    description: "Отсюда идет сигнал",
    status: "Используется",
  },
  {
    id: 13,
    num: 49,
    color: "salmon",
    description: "Проверка сигнала",
    status: "Активный",
  },
  {
    id: 14,
    num: 52,
    color: "tan",
    description: "Соединение завершено",
    status: "Неактивный",
  },
  {
    id: 15,
    num: 65,
    color: "teal",
    description: "Сюда входит кабель",
    status: "Входная группа",
  },
  {
    id: 16,
    num: 78,
    color: "turquoise",
    description: "Отсюда выходит кабель",
    status: "Используется",
  },
  {
    id: 17,
    num: 85,
    color: "violet",
    description: "Связь установлена",
    status: "Активный",
  },
  {
    id: 18,
    num: 91,
    color: "wheat",
    description: "Требует обслуживания",
    status: "Неактивный",
  },
  {
    id: 19,
    num: 13,
    color: "crimson",
    description: "Завершено обновление",
    status: "Активный",
  },
  {
    id: 20,
    num: 25,
    color: "indigo",
    description: "Сюда входит оптоволокно",
    status: "Входная группа",
  },
];

export const generationNum = () => {
  let list = [];
  for (let i = 0; i <= 255; i++) {
    list.push({ num: i, color: i % 19 === 0 ? "#8ccb49" : "#fff" });
  }
  return list;
};

export const ipBlocks = [
  {
    ip: "11.12.2.*",
    numbers: generationNum(),
  },

  {
    ip: "30.21.0.*",
    numbers: generationNum(),
  },

  {
    ip: "10.251.21.*",
    numbers: generationNum(),
  },

  {
    ip: "11.12.2.*",
    numbers: generationNum(),
  },

  {
    ip: "30.21.0.*",
    numbers: generationNum(),
  },

  {
    ip: "10.251.21.*",
    numbers: generationNum(),
  },
  {
    ip: "11.12.2.*",
    numbers: generationNum(),
  },

  {
    ip: "30.21.0.*",
    numbers: generationNum(),
  },

  {
    ip: "10.251.21.*",
    numbers: generationNum(),
  },

  {
    ip: "11.12.2.*",
    numbers: generationNum(),
  },

  {
    ip: "30.21.0.*",
    numbers: generationNum(),
  },

  {
    ip: "10.251.21.*",
    numbers: generationNum(),
  },
];

export const haProxy = [
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "(для операторской Иски) (для операторской Иски) (для операторской Иски)",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "Сайт для магазина Эко-ленд",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "(Сайт для веб верии таджикистана)",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "()",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "(Сайт для магазина Эко-ленд)",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "(для операторской Иски)",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "(для операторской Иски)",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "()",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "(для операторской Иски)",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "(для операторской Иски)",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "(для операторской Иски)",
    guid: "asdadasdasdas",
  },
  {
    name: "isko-operator.333.kg",
    host: "11.12.2.36:80",
    desc: "()",
    guid: "asdadasdasdas",
  },
];

export const list_haProxy = [
  [
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
  ],
  [
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
  ],
  [
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
    ...haProxy,
  ],
  haProxy,
  haProxy,
  haProxy,
];

const objIp = {
  ip: "77.235.22.55",
  ping: "1.959",
  comment: "Выдали Артему artem-ubuntu",
  num: "3562",
};

export const listPrivoiders = [
  {
    privoider: "Мегалайн-2",
    listInnerProv: [
      {
        nameBlock: "Блок 3 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 2 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 1",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
    ],
  },
  {
    privoider: "Сайма",
    listInnerProv: [
      {
        nameBlock: "Блок 3 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 2 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 1",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
    ],
  },
  {
    privoider: "Акнет",
    listInnerProv: [
      {
        nameBlock: "Блок 3 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 2 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 1",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp],
      },
    ],
  },
  {
    privoider: "Мегалайн",
    listInnerProv: [
      {
        nameBlock: "Блок 3 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 2 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 1",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
    ],
  },
  {
    privoider: "Акнет",
    listInnerProv: [
      {
        nameBlock: "Блок 3 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 2 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 1",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
    ],
  },
  {
    privoider: "Мегалайн",
    listInnerProv: [
      {
        nameBlock: "Блок 3 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 2 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 1",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp],
      },
    ],
  },
  {
    privoider: "Мегалайн",
    listInnerProv: [
      {
        nameBlock: "Блок 3 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 2 Мегалайн",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
      {
        nameBlock: "Блок 1",
        host: "77.235.22.48",
        hostTwo: "77.235.22.48 - 77.235.22.63",
        list: [objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp, objIp],
      },
    ],
  },
];

export const generateRandomData = (numEntries) => {
  ///// delete
  const data = [];
  const now = new Date();

  for (let i = 0; i < numEntries; i++) {
    // Генерация случайной даты (предыдущие 30 дней)
    const randomDate = new Date(
      now.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    );
    const formattedDate = `${randomDate
      .getDate()
      .toString()
      .padStart(2, "0")}.${(randomDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${randomDate.getFullYear()} ${randomDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${randomDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Генерация случайных значений для CPU и RAM
    const CPU = Math.floor(Math.random() * 20) + 1;
    const RAM = Math.floor(Math.random() * 41) + 30;

    data.push({
      time: formattedDate,
      CPU: CPU,
      RAM: RAM,
    });
  }

  return data;
};

export const everyNerwork = {
  avg_ping: 0.262,
  blocked_date: "2024-05-13T14:41:22.710Z",
  blocked_status: null,
  date_system: "2024-08-08T00:03:27.063Z",
  guid: "3A44B145-11CC-4091-BFA7-B574617DF81C",
  guid_network: "7222115B-8E91-4C97-892E-6DA50ACA3105",
  ip_address: "11.12.1.200",
  ip_number: "200",
  ip_status: 1,
  last_checked: 0,
};

export const listDns = [
  {
    id: 1,
    name: "ChatGTP-SERVICE-10.160.21.207 GEOLOCATION-10.20.40.22 333_0.kg",
  },
  { id: 2, name: "ChatGTP-SERVICE-10.160.21.207" },
  { id: 3, name: "333_2.kg" },
  {
    id: 4,
    name: "ChatGTP-SERVICE-10.160.21.207 GEOLOCATION-10.20.40.22 ",
  },
  {
    id: 5,
    name: "pay-sevise-api-10.160.21.8 ChatGTP-SERVICE-10.160.21.207  333_4.kg",
  },
  {
    id: 6,
    name: "ChatGTP-SERVICE-10.160.21.207 GEOLOCATION-10.20.40.22 ChatGTP-SERVICE-10.160.21.207 GEOLOCATION-10.20.40.22  ",
  },
  { id: 7, name: "pay-sevise-api-10.160.21.87  pay-sevise-api-10.160.21.87" },
  {
    id: 8,
    name: "GEOLOCATION-10.20.40.22 ChatGTP-SERVICE-10.160.21.207 GEOLOCATION-10.20.40.22",
  },
  {
    id: 9,
    name: " pay-sevise-api-10.160.21.8 ChatGTP-SERVICE-10.160.21.207 GEOLOCATION-10.20.40.227",
  },
  {
    id: 10,
    name: " pay-sevise-api-10.160.21.87 ChatGTP-SERVICE-10.160.21.207 GEOLOCATION-10.20.40.22",
  },
  {
    id: 11,
    name: "333_10.kg ChatGTP-SERVICE-10.160.21.207 GEOLOCATION-10.20.40.22",
  },
  { id: 12, name: "GEOLOCATION-10.20.40.22  GEOLOCATION-10.20.40.22 " },
  { id: 13, name: "333_2.kg" },
  { id: 14, name: "ChatGTP-SERVICE-10.160.21.207 GEOLOCATION-10.20.40.22 " },
  {
    id: 15,
    name: "pay-sevise-api-10.160.21.87 pay-sevise-api-10.160.21.8 ChatGTP-SERVICE-10.160.21.207 ",
  },
  {
    id: 16,
    name: "pay-sevise-api-10.160.21.87 pay-sevise-api-10.160.21.8 ChatGTP-SERVICE-10.160.21.207 ",
  },
  {
    id: 17,
    name: "pay-sevise-api-10.160.21.87 pay-sevise-api-10.160.21.8 ChatGTP-SERVICE-10.160.21.207 ",
  },
  {
    id: 18,
    name: "pay-sevise-api-10.160.21.87 pay-sevise-api-10.160.21.8 ChatGTP-SERVICE-10.160.21.207 ",
  },
  { id: 19, name: "10.160.21.87 pay-sevise-api-10.160.21.8  333_8.kg" },
  { id: 20, name: "333_8.kg10.160.21.87 pay-sevise-api-10.160.21.8  " },
  {
    id: 21,
    name: "10.160.21.87 pay-sevise-api-10.160.21.8  333_0.kg 10.160.21.87 pay-sevise-api-10.160.21.8 ",
  },
  { id: 22, name: "10.160.21.87 pay-sevise-api-10.160.21.8  333_1.kg" },
  { id: 23, name: "10.160.21.87 pay-sevise-api-10.160.21.8  333_2.kg" },
  {
    id: 24,
    name: "333_3.kg10.160.21.87 pay-sevise-api-10.160.21.8  10.160.21.87 pay-sevise-api-10.160.21.8 ",
  },
  { id: 25, name: "333_4.kg" },
  { id: 26, name: "333_5.kg" },
  { id: 27, name: "333_6.kg" },
  { id: 28, name: "333_7.kg" },
  { id: 29, name: "333_8.kg" },
  { id: 30, name: "333_8.kg" },
  { id: 31, name: "333_0.kg" },
  { id: 32, name: "333_1.kg" },
  { id: 33, name: "333_2.kg" },
  { id: 34, name: "333_3.kg" },
  { id: 35, name: "333_4.kg" },
  { id: 36, name: "333_5.kg" },
  { id: 37, name: "333_6.kg" },
  { id: 38, name: "333_7.kg" },
  { id: 39, name: "333_8.kg" },
  { id: 40, name: "333_8.kg" },
];

export const listSel = [
  { id: 1, name: "минута" },
  { id: 2, name: "час" },
  { id: 3, name: "день" },
  { id: 4, name: "неделя" },
];

export const innerDns = [
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
  { name: "333.kg", type: "NS", ttl: 900, data: "ns3.333.kg" },
];

export const listDnsMenu = [
  { id: 1, name: "New A-record (Host Address)" },
  { id: 2, name: "New CNAME-record" },
  { id: 3, name: "New MX-record" },
  { id: 4, name: "New NS-record" },
  { id: 5, name: "TXT-record" },
  { id: 6, name: "PTR-record" },
  { id: 7, name: "SPF-record" },
];

export const dnsListDefault = {
  one: {
    domen_guid: "",
    record_name: "",
    host_ip: "",
    ttl: "120",
    ttl_type: 1,
    comment: "",
    is_check_my_ip: true,
    type_record: 1,
  },
  two: {
    domen_guid: "",
    record_name: "",
    host_ip: "",
    ttl: "120",
    ttl_type: 1,
    comment: "",
    type_record: 2,
  },
  three: {
    domen_guid: "",
    record_name: "",
    host_ip: "",
    ttl: "120",
    ttl_type: 1,
    comment: "",
    type_record: 3,
  },
  four: {
    domen_guid: "",
    record_name: "",
    host_ip: "",
    ttl: "120",
    ttl_type: 1,
    comment: "",
    type_record: 4,
  },
  five: {
    domen_guid: "",
    record_name: "",
    txt_string: "",
    ttl: "120",
    ttl_type: 1,
    comment: "",
    type_record: 5,
  },
  six: {
    domen_guid: "",
    record_name: "",
    point_to_name: "",
    ttl: "120",
    ttl_type: 1,
    comment: "",
    type_record: 6,
  },
  seven: {
    domen_guid: "",
    record_name: "",
    sdf_string: "",
    ttl: "120",
    ttl_type: 1,
    comment: "",
    is_check_my_ip: true,
    type_record: 7,
  },
};

export const defaultSubDomen = {
  record_name: "",
  host_ip: "",
  ttl: "",
  ttl_type: 1,
  comment: "",
};

export const listOS = [
  { id: 1, img: windows },
  { id: 2, img: ubuntu },
  { id: 3, img: freeNas },
  { id: 4, img: freeBSD },
  { id: 5, img: centos },
];

export const listFast = [
  { id: "0", name: "none" },
  { id: "lzo", name: "LZO (fast)" },
  { id: "gzip", name: "GZIP (good)" },
  { id: "zstd", name: "ZSTD (fast and good)" },
];

export const listTypes = [
  { id: 1, name: "px-huawei (4421.50 гб)" },
  { id: 2, name: "pxmb105-2 (538.02 гб)" },
  { id: 3, name: "pxmb105-6 (3736.70 гб)" },
  { id: 4, name: "local (85.22 гб)" },
  { id: 5, name: "pxmb105-5 (538.02 гб)" },
];

export const listSnaps = [
  { id: "snapshot", name: "Snapshot" },
  { id: "suspend", name: "Suspend" },
  { id: "stop", name: "Stop" },
];

export const accessesUsers = [
  {
    guid: "1231asdasdas123",
    name: "Нурлан Системa",
    view: true,
    vnc: true,
    play: true,
    restart: true,
    stop: true,
    warning: true,
    info: true,
  },
  {
    guid: "asdas132d1as123asdas",
    name: "Данил",
    view: true,
    vnc: true,
    play: true,
    restart: true,
    stop: true,
    warning: true,
    info: true,
  },
  {
    guid: "as1232dasdas1234232332423423",
    name: "Артем",
    view: true,
    vnc: true,
    play: true,
    restart: true,
    stop: true,
    warning: true,
    info: true,
  },
  {
    guid: "as1232dasdas123423233длор2423423",
    name: "Абдурауф Таджикистан 1С сервера",
    view: true,
    vnc: true,
    play: true,
    restart: true,
    stop: true,
    warning: true,
    info: true,
  },
];

export const mylistVolns = {
  active: [
    { guid: "32121341c134v12sd3v412", vm_id: "4211" },
    { guid: "3241c131214v12sd3v412", vm_id: "4211" },
    { guid: "3241c134v123v4sd11231232", vm_id: "92121" },
    { guid: "3241c134v1523sdfsdfv412", vm_id: "4291" },
    { guid: "3241c134v1312sd323v412", vm_id: "4911" },
    { guid: "3241c131234vsdf123v412", vm_id: "42211" },
    { guid: "3241c134v546dfsdf5123v412", vm_id: "421511" },
    { guid: "3241c134546vafa123v412", vm_id: "54211" },
    { guid: "3241c13474vadf123v412", vm_id: "42311" },
  ],

  diactive: [
    { guid: "3241c13483sdf63v123v412", vm_id: "42811" },
    { guid: "3241c1367fsd3sdfg4v123v412", vm_id: "42711" },
    { guid: "3241c13833sdf4v123v412", vm_id: "92511" },
    { guid: "3241c1315gsg14v123v412", vm_id: "43291" },
    { guid: "3241c1315fds5y54b45154v123v412", vm_id: "491211" },
    { guid: "3241c131554sdfv123v412", vm_id: "412211" },
    { guid: "3241c1143gsdf4v123v412", vm_id: "4215511" },
    { guid: "3241c134v1sdbsd23v412", vm_id: "5484211" },
    { guid: "3241c131341sd4v123v412", vm_id: "425311" },
  ],

  clear: [
    { guid: "3241asdfac134v1fdsfa23v412", vm_id: "42871" },
    { guid: "3241sdfc134vafdadf123v412", vm_id: "42261" },
  ],
};

export const listIp = [
  { id: "asdas1", name: "212.112.105.251" },
  { id: "asdas2", name: "212.112.105.45" },
  { id: "asdas3", name: "212.112.105.212" },
  { id: "asdas4", name: "212.112.105.22" },
  { id: "asdas5", name: "212.112.105.156" },
];

export const listIpTwo = [
  { id: "asdas1", ip: "212.112.105.100" },
  { id: "asdas2", ip: "212.112.105.200" },
  { id: "asdas3", ip: "212.112.105.30" },
  { id: "asdas4", ip: "212.112.105.40" },
  { id: "asdas5", ip: "212.112.105.86" },
];

export const listProtocols = [
  { id: 1, name: "http" },
  { id: 2, name: "https" },
  { id: 3, name: "http/https" },
];

export const objDefault = {
  //// потом надо удалить
  guid: "",
  name: "",
  status: true,
  comment: "asdasdas",
  type: 1,
  ip_addres: "212.222",
  checkType: true,
  typeAction: 0, //// 1 - создание, 2 - редактирование, 3 удаление
};

export const objTyperecords = {
  A: "host_ip",
  CNAME: "",
  MX: "",
  NS: "",
  TXT: "",
  PTP: "",
  SPF: "",
};

export const objTyperecordsKeys = {
  A: "Host IP address",
  CNAME: "Alias for domain (FQDN)",
  MX: "Mail server host (FQDN)",
  NS: "DNS Server (FQDN)",
  TXT: "Text strings",
  PTP: "Point to name (FQDN)",
  SPF: "SPF string",
};

///// cтатичесике ip адреса

export const listColorStatics = [
  { id: 1, name: "Белый", color: "#fff" },
  { id: 2, name: "Зеленый", color: "#A2C37C" },
  { id: 3, name: "Фиолетовый", color: "#9783F5" },
  { id: 4, name: "Синий", color: "#1A21CF" },
  { id: 5, name: "Бордовый", color: "#5E0E1E" },
];

export const listColorVitual = [
  { id: 1, name: "Контейнер" },
  { id: 2, name: "Виртуалка" },
];

export const objSubGroup = {
  1: "Добавление подгруппы IP адресов",
  2: "Редактирование  подгруппы",
};

export const objStaticsIP = {
  1: "Создание Статического IP",
  2: "Редактирование Статического IP",
};

export const objGroup = {
  1: "Добавление группы IP адресов",
  2: "Редактирование группы",
};
