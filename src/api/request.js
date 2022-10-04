import axios from 'axios';
import Cookie from 'js-cookie';

const createAxiosByinterceptors = (config) => {
  const instance = axios.create({
    headers: {
      authorization: Cookie.get('cookie') || '',
    },
    timeout: 10000,
    withCredentials: false,
    ...config,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      const { statusCode, data, msg } = response.data;
      if (statusCode == 401) console.log('token expired');
      else {
        return data;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

const request = createAxiosByinterceptors({
  baseURL: 'http://127.0.0.1:3001/api/v1',
});

export default request;
