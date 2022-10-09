import React, { createContext, useReducer } from 'react';
import { initialState, ProductsReducer } from '../Reducers/ProductsReducer';
import {
    GET_PRODUCTS,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children, axios, history, config }) => {

    const [data, dispatch] = useReducer(ProductsReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
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
            console.log(res);
            // let { groups } = res.data;
            // let { total, data, current_page, per_page } = groups;
            // dispatch({ type: GET_GROUPS, payload: data });
            // dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
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
        data: {...data, config}, get_products,
        history, dispatch, get_axios,
        set_table_loading, set_mouted,
    };

    return (
        <ProductsContext.Provider value={todoContextData}>
            { children }
        </ProductsContext.Provider>
    );
}

export default ProductsContextProvider;
