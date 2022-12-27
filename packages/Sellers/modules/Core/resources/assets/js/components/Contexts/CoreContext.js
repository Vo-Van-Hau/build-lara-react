import React, { createContext, useReducer } from 'react';
import {
    initialState, CoreReducer
} from '../Reducers/CoreReducer';
import { GET_MODULE, GET_USER, SET_TABLE_LOADING } from '../Dispatch/type';
import api from '../../helpers/api';

export const CoreContext = createContext();

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns
 */
const CoreContextProvicer = ({ children, axios, history }) => {

    const [data, dispatch] = useReducer(CoreReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param
     * @returns {void}
     */
    const get_module = () => {
        return api
        .get_secured()
        .get(
            `${window.sparrowConfig.app.backendURL}/api/core/core/get_module`
        )
        .then(res => {
            let { language, menus, modules, config } = res.data;
            dispatch({
                type: GET_MODULE,
                payload: {
                    config,
                    menus,
                    modules,
                    language
                }
            });
        });
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: Authentication User
     * @param
     * @returns {void}
     */
    const get_user = () => {
        set_table_loading();
        return api
        .get_secured().post(
            `${window.sparrowConfig.app.backendURL}/api/auth/auth/authenticate_user`
        ).then(res => {
            let { status, message, data } = res.data;
            if(status) {
                const { status, user } = data;
                if(status) {
                    dispatch({ type: GET_USER, payload: user});
                }
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});;
    };


    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param
     * @returns {void}
     */
    const logout = () => {
        set_table_loading();
        return api
        .get_secured().post(
            `${window.sparrowConfig.app.backendURL}/api/auth/auth/logout`
        ).then(res => {
            let { status, message, data } = res.data;
            return window.location.href = `${window.sparrowConfig.app.backendURL}/auth/login`;
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});;
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: set table loading...
     * @return {void}
     */
     const set_table_loading = () => {
        dispatch({ type: SET_TABLE_LOADING });
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param /
     * @returns {Object}
     */
    const get_axios = () => {
        return axios;
    };

    const todoContextData = {
        data, get_user, set_table_loading,
        dispatch, logout,
        get_axios,
        get_module
    };

    return (
        <CoreContext.Provider value={todoContextData}>
            {children}
        </CoreContext.Provider>
    );
};

export default CoreContextProvicer;
