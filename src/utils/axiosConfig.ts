import axios from "axios";
import config from "config";

export const axiosBaseConfig = (): void => {
  axios.defaults.baseURL = config.API_URL;
  axios.defaults.headers.common.Accept = "aplication/json";
  axios.defaults.headers.common["Content-Type"] =
    "application/x-www-form-urlencoded";
};

export const axiosSetAuthToken = (token: string): void => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const axiosRemoveAuthToken = (): void => {
  delete axios.defaults.headers.common.Authorization;
};

export const axiosSetInterceptor = () => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        axiosRemoveAuthToken();
        sessionStorage.clear();
        window.location.href = `/login`;
      }
      return Promise.reject(error);
    }
  );
};
