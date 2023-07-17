import axios from "axios";

export * from "./routes.constants";

export const baseURL = "https://premierswapng.com/api/app";


const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Headers": "Content-Type",
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
    'User-Agent': '@premierswapng_agent/v2.0',
    
  },
});
console.log("ee");


axiosInstance.interceptors.request.use();

export default axiosInstance;
