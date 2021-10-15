import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://evader-backend.herokuapp.com/',
});

const { CancelToken } = axios;

export { CancelToken };
export default axiosInstance;
