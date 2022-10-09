import axios from 'axios';
import Cookies from 'js-cookie';

const createAxiosByinterceptors = (config) => {
  const instance = axios.create({
    timeout: 30000,
    withCredentials: false,
    ...config,
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers['authorization'] = Cookies.get('app_token') ? `Bearer ${Cookies.get('app_token')}` : ''
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error.response)
      if(error.response.status === 401) {
        console.log('Token Expired! Please Login')
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

const request = createAxiosByinterceptors({
  baseURL: 'http://127.0.0.1:3001/api/v1',
});

export default request;
