import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, SearchReducer } from '../Reducers/SearchReducer';
import {
    GET_PRODUCTS, SET_TABLE_LOADING, MOUTED, GET_PRODUCT_CATEGORIES
} from '../Dispatch/type';

export const SearchContext = createContext();

const SearchContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(SearchReducer, initialState);

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
     * @todo: get products by options
     * @param {Object} data
     * @return {void}
     */
     const get_products = (data) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/get_by_options`, {...data})
        .then((res) => {
            const {status} = res.data;
            if(status) {
                let { products } = res.data.data;
                let { data } = products;
                dispatch({ type: GET_PRODUCTS, payload: data });
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get product categories
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
     const get_product_categories = (page, keySearch) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/get_product_categories?page=${page}`, {...keySearch})
        .then((res) => {
            let { status } = res.data;
            if(status) {
                let { categories } = res.data.data;
                dispatch({ type: GET_PRODUCT_CATEGORIES, payload: categories });
                // dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
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
        data: {...data, config}, get_product_categories,
        history, dispatch, get_axios, get_products,
        set_table_loading, set_mouted, setRouter,
    };

    return (
        <SearchContext.Provider value={todoContextData} >
            { children }
        </SearchContext.Provider>
    );
}

export default SearchContextProvider;
