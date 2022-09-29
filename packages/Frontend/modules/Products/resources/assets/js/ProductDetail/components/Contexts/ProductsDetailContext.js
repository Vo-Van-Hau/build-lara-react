import React, { createContext, useReducer } from 'react';
import { initialState, ProductDetailReducer } from '../Reducers/ProductDetailReducer';
import {
    GET_PRODUCT_ITEM, SET_TABLE_LOADING, MOUTED,
    ADD_TO_CART
} from '../Dispatch/type';

export const ProductDetailContext = createContext();

const ProductDetailContextProvicer = ({ children, axios, history, config }) => {

    const [data, dispatch] = useReducer(ProductDetailReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_product_item = (values) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/get_item`, {...values})
        .then((res) => {
            let { product } = res.data;
            dispatch({ type: GET_PRODUCT_ITEM, payload: product });
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const add_to_cart = (values) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/checkout/carts/storage`, { ...values })
        .then((res) => {
            let { status, message } = res.data;
            if(status) {
                Helper.Notification('success', '[Thêm vào giỏ hàng]', message);
            } else {
                Helper.Notification('error', 'Thêm vào giỏ hàng', message);
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
        data: {...data, config},
        history, dispatch, get_axios, set_table_loading,
        set_mouted, get_product_item, add_to_cart
    };

    return (
        <ProductDetailContext.Provider value={todoContextData}>
            { children }
        </ProductDetailContext.Provider>
    );
}

export default ProductDetailContextProvicer;
