export const clearHaPrioxy = {
  guid: "",
  name: "",
  status: false,
  comment: "",
  type: 0,
  ip_addres: "",
  checkType: false,
  typeAction: 0, //// 1 - создание, 2 - редактирование, 3 удаление
};

export const clearBackUp = {
  name: "",
  guid: "",
  fasts: 0,
  type: 0,
  snaps: 0,
};

export const clearAddTempContData = {
  container_name: "",
  cpu: 0,
  ram: 0,
  ssd: 0,
  bool: false,
};

export const clearDataTemporaryHosts = {
  host_name: "",
  guid_node: "",
  node_model: "",
  listVmbr: [],
};

export const clearDataAddHost = {
  host_name: "",
  login: "",
  password: "",
  ip_address: "",
  sort: 1,
  bool: false,
};

export const clearDataTemporaryDNS = {
  domen_name: "",
  comment: "",
  expire: "360000",
  negative: "3600",
  refresh: "3600",
  retry: "900",
  is_check_my_ip: true,
  my_ip: "",
};
