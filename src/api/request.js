import axios from 'axios';
import Cookies from 'js-cookie';
import { loading } from '../components';

const createAxiosByinterceptors = (config) => {
  const instance = axios.create({
    timeout: 30000,
    withCredentials: false,
    ...config,
  });

  instance.interceptors.request.use(
    (config) => {
      loading.show();
      config.headers['authorization'] = Cookies.get('app_token')
        ? `Bearer ${Cookies.get('app_token')}`
        : '';
      return config;
    },
    (error) => {
      loading.hide();
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      loading.hide();
      return response.data;
    },
    (error) => {
      loading.hide();
      console.log(error.response);
      if (error.response.status === 401) {
        console.log('Token Expired! Please Login');
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
