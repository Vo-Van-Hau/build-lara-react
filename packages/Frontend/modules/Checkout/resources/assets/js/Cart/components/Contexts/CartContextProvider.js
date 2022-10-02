import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, CartReducer } from '../Reducers/CartReducer';
import {
    GET_CART,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const CartContext = createContext();

const CartContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(CartReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get cart by user
     * @return {void}
     */
    const get_cart = () => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/checkout/carts/get_cart`)
        .then((res) => {
            let { cart } = res.data;
            if(cart) dispatch({ type: GET_CART, payload: cart });
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: remove product in cart
     * @param {number} cart_id
     * @param {number} product_id
     * @return {void}
     */
    const remove_item = (cart_id, product_id) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/checkout/carts/remove_item`, { cart_id, product_id });
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: storage group
     * @param {Object} values
     * @return {void}
     */
    const storage_group = (values = {}) => {
        // return axios
        // .get_secured()
        // .post(`/users/groups/storage`, {...values});
        console.log(values);
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
        history, dispatch, get_axios, storage_group,
        set_table_loading, set_mouted,
        get_cart, setRouter, remove_item
    };

    return (
        <CartContext.Provider value={todoContextData}>
            { children }
        </CartContext.Provider>
    );
}

export default CartContextProvider;
