import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, AddressReducer } from '../Reducers/AddressReducer';
import {
    GET_ADDRESS,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const AddressContext = createContext();

const AddressContextProvider = ({ children, axios, history, config,navigate }) => {

    const [data, dispatch] = useReducer(AddressReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get address
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_address = (page, keySearch) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/address/address/get_customer_address?page=${page}`, {...keySearch})
        .then((res) => {
            let { status, data, message } = res.data;
            let { address } = data;
            dispatch({ type: GET_ADDRESS, payload: address });
            // dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

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
        setRouter, get_address
    };

    return (
        <AddressContext.Provider value={todoContextData}>
            { children }
        </AddressContext.Provider>
    );
}

export default AddressContextProvider;
