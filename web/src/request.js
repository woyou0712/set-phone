import Axios from "axios";

const request = Axios.create({ baseURL: "http://127.0.0.1:16888" });

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use((value) => {
  return value.data;
});

export default request;
