import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, CoreReducer } from '../Reducers/CoreReducer';
import { GET_MODULE, SET_TABLE_LOADING, GET_USER, MOUTED } from '../Dispatch/type';
import api from '../../helpers/api';

export const CoreContext = createContext();

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns
 */
const CoreContextProvider = ({ children, axios, history }) => {

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
            return window.location.href = `${window.sparrowConfig.app.backendURL}/home/home`;
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});;
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object}
     * @return {void}
     */
    const setRouter = ({
        action,
        id = '',
        module = '',
        controller = '',
        q = ''
    }, navigate) => {
        set_mouted(true);
        let parseURL = window.sparrowConfig.app.adminPrefix ? '/' + window.sparrowConfig.app.adminPrefix : '';
        if(module) parseURL += `/${module}`;
        if(controller) parseURL += `/${controller}`;
        let parseACT = action ? `?action=${action}` : ``;
        let parseKeyID = id ? `&id=${id}` : ``;
        let parseQ = q ? `&q=${q}` : ``;
        let nextURL = `${parseURL}${parseACT}${parseKeyID}${parseQ}`;
        history.push(nextURL);
        return navigate({
            pathname: parseURL,
            search: `?${createSearchParams({action, id, q})}`,
        });
    }


    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {void}
     */
     const set_mouted = (values) => {
        dispatch({ type: MOUTED, payload: values});
    }

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
        data, get_user, setRouter, logout,
        dispatch,
        get_axios,
        get_module
    };

    return (
        <CoreContext.Provider value={todoContextData}>
            {children}
        </CoreContext.Provider>
    );
};

export default CoreContextProvider;
