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

export function textActionVM(text) {
  const cleanedText = text.toLowerCase().trim();
  if (cleanedText.includes("error"))
    return {
      color: "red",
      size: 18,
      fontWeight: "500",
    };
  else if (cleanedText.includes("task ok"))
    return {
      color: "green",
      size: 18,
      fontWeight: "500",
    };
  else
    return {
      color: "white",
      size: 14,
      fontWeight: "400",
    };
}
