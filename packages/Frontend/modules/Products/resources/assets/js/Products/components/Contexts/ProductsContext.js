import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, ProductsReducer } from '../Reducers/ProductsReducer';
import {
    GET_PRODUCTS, SET_TABLE_LOADING, MOUTED, GET_PRODUCT_CATEGORIES,
    GET_PRODUCT_CATEGORY,
} from '../Dispatch/type';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(ProductsReducer, initialState);

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
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
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
     * @todo: get products by category
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_products_by_category = (data) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/get_products_by_category`, {...data})
        .then((res) => {
            let { data, status } = res.data;
            if(status) {
                let { products } = data;
                dispatch({ type: GET_PRODUCTS, payload: products });
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
     * @todo: get product category
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
     const get_product_category = (data) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/get_product_category`, {...data})
        .then((res) => {
            let { status } = res.data;
            if(status) {
                let { item } = res.data.data;
                dispatch({ type: GET_PRODUCT_CATEGORY, payload: item });
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
        data: {...data, config}, get_product_categories, get_products_by_category,
        history, dispatch, get_axios, get_products, get_product_category,
        set_table_loading, set_mouted, setRouter,
    };

    return (
        <ProductsContext.Provider value={todoContextData} >
            { children }
        </ProductsContext.Provider>
    );
}

export default ProductsContextProvider;
