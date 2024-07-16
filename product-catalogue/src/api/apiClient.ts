import axios from 'axios';

const apiClient = axios.create({ baseURL: 'https://dummyjson.com' });

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            try {
                const response = await axios.post('https://dummyjson.com/auth/refresh', { token: refreshToken });
                if (response.status === 200) {
                    const newToken = response.data.token;
                    localStorage.setItem('token', newToken);
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
