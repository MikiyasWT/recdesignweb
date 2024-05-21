import api from './api';


export async function registerApi(payload){
  try {
    return  await api.post('/authentication', payload);
    
  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
}






export async function loginApi(payload){
  try {
    return await api.post('/authentication/login', payload)
  } catch (error) {
    console.error('login error:', error);
    throw error;
  }
}










