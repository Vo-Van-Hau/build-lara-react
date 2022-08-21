import axios from 'axios';
import _ from 'lodash';

const defaultOptions = {
    timeout: 10000
};

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {Object} clientOptions
 * @returns {Object}
 */
const create_client = (clientOptions) => {
    const instance = axios.create({
        ...defaultOptions,
        ...clientOptions
    });

    // You can intercept requests or responses before they are handled by then or catch.
    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    return instance;
};

export default {
    get_api_url() {
        const override_api_url = window.sparrowConfig.app.backendURL
            ? { baseURL: `${window.sparrowConfig.app.backendURL}/api/` }
            : { baseURL: `/api/` };
        return override_api_url;
    },
    get_secured({ token, timeout = 10000 } = {}) {
        if (!token) {
            token = window.axios.defaults.headers.common['X-CSRF-TOKEN'];
        }
        console.log(window.axios.defaults.headers.common);
        return create_client({
                timeout,
                headers: {
                    'X-CSRF-TOKEN': token
                },
                ...this.get_api_url()
            });
    },
}
