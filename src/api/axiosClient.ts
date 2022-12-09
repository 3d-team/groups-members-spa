import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

import AppState from '@/redux/store';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// const state = AppState.store.getState();
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    config.headers = config.headers ?? {};
    config.headers.Authorization = (token) ? `Bearer ${token}` : '';
    return config;
}, 
(error) => {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use((response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, 
(error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient;