export const serachNameDomen = (activeGuid, listDns) => {
  ///// для поиска доменного имени по guid
  const dnsName = listDns?.find((i) => i?.guid == activeGuid)?.domen_name || "";
  return dnsName;
};
