import React, { createContext, useReducer } from 'react';
import { initialState, SellersReducer } from '../Reducers/SellersReducer';
import { createSearchParams } from 'react-router-dom';
import {
    SET_PAGINATION, SET_TABLE_LOADING, GET_SELLERS,
    MOUTED, LOADING_STATE
} from '../Dispatch/type';
import Helper from '../Helper/Helper';

export const SellersContext = createContext();

const SellersContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(SellersReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get sellers
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_sellers = (page, keySearch) => {
        set_table_loading();
        return axios
            .get_secured()
            .post(`/sellers/sellers/get_list?page=${page}`, {...keySearch})
            .then((res) => {
                let { sellers } = res.data;
                let { total, data, current_page, per_page } = sellers;
                dispatch({ type: GET_SELLERS, payload: data });
                dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } });
            })
            .catch((errors) => {})
            .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {number} id
     * @return {void}
     */
    // const get_user = (keyID) => {
    //     return axios
    //     .get_secured()
    //     .post(`/users/users/get_user`, {id: keyID });
    // }

    // const storage_user = (formData) => {
    //     const config = {
    //         timeout: 1000 * 60 * 2,
    //         headers: { 'content-type': 'multipart/form-data' }
    //     }
    //     return axios
    //     .get_secured()
    //     .post(`/users/users/storage`, formData, config)
    // }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: update user
     * @param {Object} values
     * @return {void}
     */
    const accept_seller = (values) => {
        dispatch({ type: LOADING_STATE });
        return axios
        .get_secured()
        .post(`/sellers/sellers/accept_seller`, {...values})
        .then((res) => {
            const { status, message } = res.data;
            if(status) {
                Helper.Notification('success', '[Update Data]', message);
            } else {
                Helper.Notification('error', '[Update Data]', message);
            }
        })
        .finally(() => {
            dispatch({ type: LOADING_STATE });
        });
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    // const get_groups = (page, keySearch) => {
    //     return axios
    //     .get_secured()
    //     .post(`/users/users/get_groups`, {...keySearch, page})
    // }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    // const get_publishers = (page, keySearch) => {
    //     return axios
    //     .get_secured()
    //     .post(`/users/users/get_publishers`, {...keySearch, page})
    // }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: redirect to...
     * @param {string} action
     * @param {string} id
     * @return {void}
     */
    const setRouter = (action, id = '') => {
        set_mouted(true);
        let parseURL = window.sparrowConfig.app.adminPrefix ? '/' + window.sparrowConfig.app.adminPrefix : '';
        parseURL += `/users/users`;
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
        data: {...data, config}, history, dispatch, get_axios, get_sellers,
        set_mouted, set_table_loading, setRouter, accept_seller
    };
    return (
        <SellersContext.Provider value={todoContextData}>
            {children}
        </SellersContext.Provider>
    );
}
export default SellersContextProvider;
