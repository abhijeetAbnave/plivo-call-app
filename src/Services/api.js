import Axios from "axios";
import config from "../Constants/config.json";

function createAxios() {
  const axios = Axios.create();
  axios.defaults.baseURL = `${config.apiEndPoint}/`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.timeout = 120000; // 2*60*1000 = 120000 = 2 minutes
  axios.interceptors.request.use(
    (conf) => {
      return conf;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response?.data,
    (error) => {
      if (error?.response?.data) return Promise.reject(error.response.data);
      return Promise.reject(error);
    }
  );
  return axios;
}

const api = createAxios();

const service = {
    postApi(route, payload = {}, options = {}) {
        return api.post(route, payload, options);
    },
}

export default service;