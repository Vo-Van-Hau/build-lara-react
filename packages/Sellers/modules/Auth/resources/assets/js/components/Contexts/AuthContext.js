import React, { createContext, useReducer } from 'react';
import { initialState, AuthReducer } from '../Reducers/AuthReducer';
import {
    SET_CONFIG, SET_TABLE_LOADING, GET_PRODUCT_CATEGORIES,
} from '../Dispatch/type';
import api from '../../helpers/api';
import Helper from '../../helpers/helper';
export const AuthContext = createContext();

const AuthContextProvicer = ({ children, history }) => {

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

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get product categories
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_product_categories = (page, keySearch) => {
        set_table_loading();
        return api
        .get_secured()
        .post(`/products/products/get_product_categories?page=${page}`, {...keySearch})
        .then((res) => {
            let { status } = res.data;
            if(status) {
                let { categories } = res.data.data;
                dispatch({ type: GET_PRODUCT_CATEGORIES, payload: categories });
            } else {

            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: set table loading...
     * @return {void}
     */
    const set_table_loading = () => {
        dispatch({ type: SET_TABLE_LOADING })
    }

    const todoContextData = {
        data, register, login, get_config, dispatch, get_product_categories,
    };

    return (
        <AuthContext.Provider value={todoContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvicer;
