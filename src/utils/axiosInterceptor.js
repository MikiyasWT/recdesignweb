import axios from 'axios';
import { Cookies } from 'universal-cookie';

const cookies = new Cookies();

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const authToken = cookies.get('authCookies');
    
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  function (error) {
 
    return Promise.reject(error);
  }
);

export default axios;