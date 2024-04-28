import axios from 'axios';
import Cookies from "js-cookie";
import AuthService from "../services/AuthService.ts";

export const BASE_URL = 'http://localhost:8081'

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30 * 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token: string | undefined = Cookies.get('token');

        if (token) {
            const data: TokenModel = JSON.parse(token);

            config.headers['Authorization'] = `Bearer ${data.accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        const token = Cookies.get('token');

        if ((error.response.status === 403 || error.response.status === 400)) {
            originalRequest._retry = true;

            const data = JSON.parse(token);

            return AuthService.refreshToken({refreshToken: data.refreshToken})
                .then((data) => {
                    console.log(data);

                    Cookies.set("token", JSON.stringify({
                        accessToken: data.data.accessToken,
                        refreshToken: data.data.refreshToken
                    }));

                    if (originalRequest.headers) {
                        originalRequest.headers["Authorization"] = `Bearer ${data.data.accessToken}`;
                    }

                    return axios(originalRequest);
                })
                .catch((error) => {
                    console.log(error)

                    Cookies.remove('token');
                    window.location.href = "/sign-in";
                    return Promise.reject(error);
                });
        }

        return Promise.reject(error);
    },
);