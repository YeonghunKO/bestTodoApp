import axios from "axios";

import { TOKEN_STORAGE_KEY } from "../constants/storage";
import { getItem } from "../utils/storage";


export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {

  const accessToken = getItem(TOKEN_STORAGE_KEY);


  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
