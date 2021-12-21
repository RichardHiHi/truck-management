import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './commons/storage';
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: any) {
    const token = getToken();
    // Do something before request is sent
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
      return config;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error) {
      const {
        data: { errors },
      } = error.response;
      for (let key in errors) {
        throw new Error(`${key} ${errors[key]}`);
      }
      return Promise.reject(error);
    }
  }
);

export default axiosClient;
