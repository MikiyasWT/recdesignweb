import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const api = axios.create({
  baseURL: "http://localhost:5037/api",
  headers: {
    'Content-Type': 'application/json',
    // 'Cookie':`token=${getAuthToken()}`
    'Accept': 'application/json',
  //  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk1MDI4ODM3LCJleHAiOjE2OTUwMzI0Mzd9.WHvIPmJ870lPYWf-TLFjQt6om3QAT7Zqh59ULSR8tcg'
    
    // Other common headers...
  },
});

// Request interceptor

api.interceptors.request.use(
    (config) => {
      const token  = cookies.get('authCookies');
      //console.log('token ', token);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } 
      return config;  
    },
    (error) => {
      //console.error('Request error:', error);
      return Promise.reject(error);
    }
  );


// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Modify the response object before returning the data
    return response;
  },
  (error) => {
    // Handle response error
    //console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default api;