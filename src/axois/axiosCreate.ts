import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((request) => {
  try {
    const token = localStorage.getItem("token") || null;

    if (request && request.headers && token) {
      request.headers.Authorization = token ? `Bearer ${token}` : false;
    }

    return request;
  } catch (error) {
    return request;
  }
});
