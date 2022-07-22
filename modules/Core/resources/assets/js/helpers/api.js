// import Promise from "bluebird";
import axios from "axios";
import _ from "lodash";
// import BaseError from "../components/BaseError";

const defaultOptions = {
    timeout: 2000
};

// const createClient = (clientOptions, { toastErrors, addInterceptor }) => {
//     const client = axios.create({
//         ...defaultOptions,
//         ...clientOptions
//     });
//     const onSuccess = response => {
//         //ProcessLoading.hide();
//         const statusCode = response.status;
//         if (statusCode != 200) {
//             return Promise.reject(
//                 new BaseError(statusCode, response.data.message, [])
//             );
//         }

//         return response;
//     };

//     const onError = error => {
//         //ProcessLoading.hide();
//         if (!error.response) {
//             return Promise.reject(new BaseError(-1, "Network error"));
//         }
//         const statusCode = error.response.status;
//         //Authentication token has expried
//         if (statusCode == 401) {
//             let data = error.response.data.error.data;
//             if (data.redirect_to) {
//                 window.location.replace(
//                     window.sparrowConfig.app.backendURL + data.redirect_to
//                 );
//             }
//         }
//         //Permission Denined
//         if (statusCode == 403) {
//             PermissionDenied.show();
//         }

//         if (toastErrors) {
//             if (error.response.data.error.message) {
//                 showToast(error.response.data.error.message);
//             } else {
//                 showToast("Something wrong happened. Please try again later.");
//             }
//         }

//         return Promise.reject(
//             new BaseError(
//                 statusCode,
//                 error.response.data.error.message,
//                 error.response.data.error.data
//             )
//         );
//     };
//     client.interceptors.response.use(onSuccess, onError);
//     //ProcessLoading.show();
//     return client;
// };

// export default {

//     getApiUrl() {
//         const overrideApiUrl = window.sparrowConfig.app.backendURL
//             ? { baseURL: `${window.sparrowConfig.app.backendURL}/api/` }
//             : { baseURL: `/api/` };
//         return overrideApiUrl;
//     },
//     getSecured({ token, toastErrors = true, timeout = 10000 } = {}) {
//         if (!token) {
//             token = window.axios.defaults.headers.common["X-CSRF-TOKEN"];
//         }
//         return createClient(
//             {
//                 timeout,
//                 headers: {
//                     "X-CSRF-TOKEN": token
//                 },
//                 ...this.getApiUrl()
//             },
//             { toastErrors }
//         );
//     },

//     getAnonymous({ toastErrors = true, timeout = 2000 } = {}) {
//         overrideApiUrl.timeout = timeout;
//         return createClient(overrideApiUrl, { toastErrors });
//     },

//     getStripePath() {
//         return overrideStripePath;
//     }
// };
