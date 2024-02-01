// This file creates an Axios instance (axiosClient) with a base URL, default headers, and a params serializer for handling query 
// parameters. It also includes interceptors to modify the request or response before it is sent or received.

import axios from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiConfig.apiKey}`

    },
    paramsSerializer: params => queryString.stringify({...params})
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default axiosClient; 