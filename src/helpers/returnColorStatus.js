export const returnColorStatus = (element) => {
  let status_ip = "";

  if (element.ip_status == "1") {
    status_ip = "greenSheat";
  } else if (element.ip_status == "0") {
    status_ip = element.blocked_status == "1" ? "orangeSheat" : "greySheat";
  } else if (element.ip_status == "-1") {
    status_ip = element.blocked_status == "1" ? "orangeSheat" : "blueSheat";
  }

  if (element.last_checked == "1") {
    status_ip = "blueAnimSheat";
  }

  return status_ip;
};
