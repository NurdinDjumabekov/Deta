import axios from "axios";
import { extractGuid } from "./helpers/transformLists";

const { REACT_APP_API_URL } = process.env;

let store; // Это стандартный store

export const propsStoreFN = (oldStore) => {
  store = oldStore;
};

const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store?.getState();
    const token = state?.saveDataSlice?.tokenA;

    const { pathname } = window.location;

    if (!!pathname) {
      const guid = extractGuid(pathname);
      config.headers["data-center-guid"] = guid;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { dispatch } = store;
        // dispatch(getToken()); // Получаю токен
        return axiosInstance.request(originalRequest);
      } catch (e) {
        console.log("Не удалось авторизоваться");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
