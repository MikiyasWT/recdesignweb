import { decodeToken } from 'react-jwt';

export const getRoleFromToken = (token) => {
  if (!token) {
    return null; // No token provided
  }
  try {
    const decoded = decodeToken(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null; // Or handle the error differently
  }
};