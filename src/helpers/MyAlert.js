import { toast } from "react-toastify";

export const myAlert = (message) => {
    toast.info(message, {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: "dark",
    });
  };