import home from "../assets/icons/menu/home.svg";
import microtic from "../assets/icons/menu/router.svg";
import seti from "../assets/icons/menu/wifi.svg";
import HaProxy from "../assets/icons/menu/HaProxy.svg";
import ipAddres from "../assets/icons/menu/ipAddres.svg";
import list from "../assets/icons/menu/list.svg";
import dns from "../assets/icons/menu/dns.svg";
import block from "../assets/icons/menu/box.svg";
import history from "../assets/icons/menu/history.svg";
import calendar from "../assets/icons/menu/calendar-week.svg";
import comands from "../assets/icons/menu/comands.svg";

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
  { id: 5, name: "Базы и хранилища", path: "/baza", img: block },
  { id: 11, name: "Команды", path: "/comands", img: comands },
];

export const pagesAllDC = [
  { id: 6, name: "ДНС", path: "/dns", img: dns },
  { id: 3, name: "Сети", path: "/networks", img: seti },
  { id: 5, name: "Статические IP", path: "/ip-addres", img: ipAddres },
  { id: 9, name: "Задачи", path: "/todos", img: list },
  { id: 10, name: "История создания", path: "/history", img: history },
  { id: 11, name: "Календарь", path: "/calendar", img: calendar },
];

export const generationNum = () => {
  let list = [];
  for (let i = 0; i <= 255; i++) {
    list.push({ num: i, color: i % 19 === 0 ? "#8ccb49" : "#fff" });
  }
  return list;
};

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

export const listProtocols = [
  { value: 1, label: "http" },
  { value: 2, label: "https" },
  { value: 3, label: "http/https" },
];

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

export const colorsList = [
  "rgb(123, 104, 238)",
  "rgb(34, 108, 7)",
  "rgb(0, 0, 255)",
  "rgb(255, 69, 0)",
  "rgb(105, 7, 108)",
  "rgb(255, 0, 255)",
  "rgb(24, 135, 204)",
  "rgb(139, 69, 19)",
  "rgb(218, 165, 32)",
  "rgb(0, 255, 255)",
  "rgb(128, 0, 0)",
  "rgb(255, 0, 0)",
  "rgb(74, 37, 0)",
  "rgb(128, 0, 128)",
  "rgb(255, 20, 147)",
  "rgb(186, 85, 211)",
  "rgb(186, 106, 9)",
  "rgb(127, 255, 212)",
  "rgb(30, 144, 255)",
  "rgb(85, 85, 85)",
  "rgb(255, 242, 0)",
  "rgb(145, 194, 0)",
  "rgb(0, 255, 255)",
  "rgb(0, 255, 0)",
  "rgb(0, 128, 0)",
];

////////////////////////////////////////////// dns /////////////////////////////////
export const objTitle = {
  0: "Запретить вносить изменения в субдомен?",
  1: "Разрешить вносить изменения в субдомен?",
};

export const allSumsProvidersFN = (props) => {
  const { countContainerOff, countVpsOff } = props;
  const { countVpsOn, countContainerOn } = props;
  const sum =
    +countContainerOff + +countVpsOff + +countVpsOn + +countContainerOn;
  return sum;
};

////////////////////////////////////////////// hosts /////////////////////////////////
export const pingtimeFN = ({ provider_pingtime }) => {
  if (+provider_pingtime < 5) {
    return "green";
  } else if (+provider_pingtime > 5 && +provider_pingtime < 40) {
    return "orange";
  } else {
    return "#ff00008c";
  }
};

export const sortMicroticNums = (list) => {
  const sortedList = [
    ...list?.filter((btn) => +btn?.name % 2 === 0), // Чётные
    ...list?.filter((btn) => +btn?.name % 2 !== 0), // Нечётные
  ];
  console.log(list, "sortedList");
  return sortedList;
};
