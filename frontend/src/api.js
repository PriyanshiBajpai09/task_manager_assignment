import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanagerassignment-production-ad45.up.railway.app/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;
