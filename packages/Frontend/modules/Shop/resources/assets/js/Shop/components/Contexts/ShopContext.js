import React, { createContext, useReducer } from 'react';
import { initialState, ShopReducer } from '../Reducers/ShopReducer';
import {
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED, GET_SELLER_PRODUCTS,
    GET_SHOP,
} from '../Dispatch/type';
import { createSearchParams } from 'react-router-dom';
import Helper from '../Helper/Helper';

export const ShopContext = createContext();

const ShopContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(ShopReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get products
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
     const get_products = (page, keySearch, seller_id) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/get_products_sellers?page=${page}`, {...keySearch, seller_id: seller_id})
        .then((res) => {
            let { status } = res.data;
            if(status) {
                let { products } = res.data.data;
                let { total, data, current_page, per_page } = products;
                dispatch({ type: GET_SELLER_PRODUCTS, payload: data });
                dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } });
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get information about specific shop
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_shop = (seller_id) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/sellers/sellers/get_shop`, {seller_id: seller_id})
        .then((res) => {
            let { status, data } = res.data;
            if(status) {
                let { shop } = data;
                dispatch({ type: GET_SHOP, payload: shop });
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: 
     * @param {Object} values
     * @return {void}
     */
    const followStore = (values) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/shop/shop/follow_store`, { ...values })
        .then((res) => {
            let { status, message } = res.data;
            if(status) {
                Helper.Notification('success', '[Theo dõi cửa hàng]', `Theo dõi thành công`);
            } else {
                Helper.Notification('error', '[Theo dõi cửa hàng]', `Theo dõi thất bại`);
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
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
     * @todo: get axios
     * @return {Object}
     */
    const get_axios = () => axios;

    const todoContextData = {
        data: {...data, config}, get_products, followStore,
        history, dispatch, get_axios, set_mouted,
        set_table_loading, setRouter, get_shop,
    };

    return (
        <ShopContext.Provider value={todoContextData}>
            { children }
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
