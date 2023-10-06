import axios from "axios";

export const addInterceptors = () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      // if (isEmpty(config.headers["Content-Type"])) {
      config.headers["Content-Type"] = "application/json";
      // }

      // config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      //   BOSLER_TOKEN
      // )}`;

      config.baseURL = "http://localhost:8080/api";

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
