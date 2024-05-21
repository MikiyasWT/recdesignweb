import api from './api';



export async function ScrapeAndStore() {
    try {
        return await api.get('http://localhost:5037/api/scrapper?pageCount=1')       
    } catch (error) {
      console.error(error);
      throw error;
    } 
  }


//get products
export async function fetchProducts() {
  try {
      return await api.get('/scrapper/products')       
  } catch (error) {
    console.error(error);
    throw error;
  } 
}


export async function AddProduct(payload) {
    try {
        return  await api.post(`/scrapper`, payload);
    } catch (error) {
      console.error('product Adding failed error:', error);
      throw error;
    }
}


export async function updateProduct(payload, productId) {
    try {
        return  await api.put(`/scrapper/${productId}`, payload);
    } catch (error) {
      console.error('product update error:', error);
      throw error;
    }
}


export async function deleteProduct(productId) {
    try {
        return await api.delete(`/scrapper/${productId}`)
    } catch (error) {
      console.error('delete product error:', error);
      throw error;
    }
}
