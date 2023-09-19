import Axios from "axios";
import getBaseUrl from "./getBaseUrl";


const request = Axios.create({ baseURL: getBaseUrl() });

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use((value) => {
  return value.data;
});

export default request;
