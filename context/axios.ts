import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

const { CancelToken } = axios;

export { CancelToken };
export default axiosInstance;
