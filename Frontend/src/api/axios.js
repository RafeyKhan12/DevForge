import axios from "axios";

const api = axios.create({
    baseURL: "https://devforge-backend-oup8.onrender.com/api/v1",
    withCredentials: true
});

export default api;