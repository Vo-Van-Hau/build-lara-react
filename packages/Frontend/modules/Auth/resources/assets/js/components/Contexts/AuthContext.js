import React, { createContext, useReducer } from 'react';
import { initialState, AuthReducer } from '../Reducers/AuthReducer';
import { SET_CONFIG } from '../Dispatch/type';
import api from '../../helpers/api';
import axios from 'axios';
export const AuthContext = createContext();

const AuthContextProvicer = ({ children, axios, history }) => {

    const [data, dispatch] = useReducer(AuthReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {void}
     */
    const get_config = () => {
        return api
        .get_secured()
        .get(`${window.sparrowConfig.app.backendURL}/api/auth/auth/get_config`)
        .then(res => {
            let { language, config } = res.data;
            dispatch({
                type: SET_CONFIG,
                payload: {
                    config: config,
                    language: language
                }
            });
        });
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} values
     * @return {Object}
     */
    const login = async (values = {
        email: '',
        password: '',
        remember: false
    }) => {
        try {
            let { email, password, remember } = values;
            const { data } = await api.get_secured()
            .post(`${window.sparrowConfig.app.backendURL}/api/auth/auth/login`, {
                email,
                password,
                remember
            });
            if(data.status) {
                return {
                    error: null,
                    ...data
                };
            } else {
                return {
                    error: true,
                    ...data
                };
            }
        } catch(errors) {
            return {
                error: true,
            }
        }
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} values
     * @return {Object}
     */
    const register = async (values) => {
        try {
            const { data } = await api.get_secured()
            .post(`${window.sparrowConfig.app.backendURL}/api/auth/auth/register`, values);
            if(data.status) {
                return {
                    error: null,
                    ...data
                };
            } else {
                return {
                    error: true,
                    ...data
                };
            }
        } catch(errors) {
            return {error: true}
        }
    };

    const todoContextData = {
        data, login, get_config, dispatch, register
    };

    return (
        <AuthContext.Provider value={todoContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvicer;
