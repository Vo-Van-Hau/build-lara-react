import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, HomeReducer } from '../Reducers/HomeReducer';
import {
    GET_PRODUCT_CATEGORIES, GET_PRODUCTS,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const HomeContext = createContext();

const HomeContextProvicer = ({ children, axios, history, config,navigate }) => {

    const [data, dispatch] = useReducer(HomeReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    // const get_categories = () => {
    //     set_table_loading();
    //     return axios
    //     .get_secured()
    //     .post(`/home/home/get_categories`)
    //     .then((res) => {
    //         let { products_categories } = res.data;
    //         dispatch({ type: GET_PRODUCT_CATEGORIES, payload: products_categories });
    //     })
    //     .catch((errors) => {})
    //     .finally(() => {set_table_loading();});
    // }
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

    const get_products = () => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/get_list`)
        .then((res) => {
            let { products } = res.data;
            let { data } = products;
            dispatch({ type: GET_PRODUCTS, payload: data });
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
        history, setRouter, dispatch, get_axios, set_table_loading, 
        set_mouted, get_products
    };

    return (
        <HomeContext.Provider value={todoContextData}>
            { children }
        </HomeContext.Provider>
    );
}

export default HomeContextProvicer;
