import React, { createContext, useReducer } from 'react';
import { initialState, AccountReducer } from '../Reducers/AccountReducer';
import {
    GET_ACCOUNT,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';
import { createSearchParams } from 'react-router-dom';

export const AccountContext = createContext();

const AccountContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(AccountReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get account info
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_account = () => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/customer/customer/get_by_auth`);
    }

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
        controller = ''
    }) => {
        set_mouted(true);
        let parseURL = window.sparrowConfig.app.adminPrefix ? '/' + window.sparrowConfig.app.adminPrefix : '';
        if(module) parseURL += `/${module}`;
        if(controller) parseURL += `/${controller}`;
        let parseACT = action ? `?action=${action}` : ``;
        let parseKeyID = id ? `&id=${id}` : ``;
        let nextURL = `${parseURL}${parseACT}${parseKeyID}`;
        history.push(nextURL);
        return navigate({
            pathname: parseURL,
            search: `?${createSearchParams({action, id})}`,
        });
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: set table loading...
     * @return {void}
     */
    const set_table_loading = () => {
        dispatch({ type: SET_TABLE_LOADING })
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
     * @todo: get axios
     * @return {Object}
     */
    const get_axios = () => axios;

    const todoContextData = {
        data: {...data, config},
        history, dispatch, get_axios, set_table_loading, set_mouted,
        get_account, setRouter
    };

    return (
        <AccountContext.Provider value={todoContextData}>
            { children }
        </AccountContext.Provider>
    );
}

export default AccountContextProvider;
