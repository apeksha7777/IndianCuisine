// src/api/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
});

export const getIndianCuisineList = async () => {
  try {
    const response = await instance.get('/indianCuisine');
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
