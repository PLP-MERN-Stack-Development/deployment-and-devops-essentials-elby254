// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-app-ksbv.onrender.com", // Backend URL
});

export default API;
