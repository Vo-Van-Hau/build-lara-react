import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, PaymentReducer } from '../Reducers/PaymentReducer';
import {
    GET_CART, GET_PAYMENT_METHODS, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const PaymentContext = createContext();

const PaymentContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(PaymentReducer, initialState);

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
            dispatch({ type: GET_CART, payload: cart });
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get cart by user
     * @return {void}
     */
    const get_payment_methods = () => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/payments/payments/get_list_methods`)
        .then((res) => {
            let { payment_methods } = res.data;
            let { data } = payment_methods
            dispatch({ type: GET_PAYMENT_METHODS, payload: data });
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
        data: {...data, config}, setRouter,
        history, dispatch, get_axios,
        set_table_loading, set_mouted,
        get_cart, get_payment_methods
    };

    return (
        <PaymentContext.Provider value={todoContextData}>
            { children }
        </PaymentContext.Provider>
    );
}

export default PaymentContextProvider;
