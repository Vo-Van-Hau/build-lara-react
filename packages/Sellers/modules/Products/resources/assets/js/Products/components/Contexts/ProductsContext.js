import React, { createContext, useReducer } from 'react';
import { initialState, ProductsReducer } from '../Reducers/ProductsReducer';
import { createSearchParams } from 'react-router-dom';
import {
    GET_PRODUCTS, GET_PRODUCT_CATEGORIES,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(ProductsReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get products
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_products = (page, keySearch) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/get_products_sellers?page=${page}`, {...keySearch})
        .then((res) => {
            let { status } = res.data;
            if(status) {
                let { products } = res.data.data;
                let { total, data, current_page, per_page } = products;
                console.log(data)
                dispatch({ type: GET_PRODUCTS, payload: data });
                dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
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
     * @todo: store a new product
     * @param {array} data
     * @return {void}
     */
    const store = (data) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/store`, {...data})
        .then((res) => {
            let { status, message, data } = res.data;
            if(status) {
                setRouter({
                    module: 'products',
                    controller: 'products',
                    action: '#',
                    id: '#'
                });
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
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
        data: {...data, config}, get_products, get_product_categories,
        history, dispatch, get_axios, store, setRouter,
        set_table_loading, set_mouted,
    };

    return (
        <ProductsContext.Provider value={todoContextData}>
            { children }
        </ProductsContext.Provider>
    );
}

export default ProductsContextProvider;
