import axios from "axios";

const instance = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json'},
  });
  
export default instance