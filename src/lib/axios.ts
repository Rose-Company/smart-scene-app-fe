import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "https://api.example.com",
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }, 
})

// Interceptors (tuỳ chọn)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung (401, 500, v.v.)
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
