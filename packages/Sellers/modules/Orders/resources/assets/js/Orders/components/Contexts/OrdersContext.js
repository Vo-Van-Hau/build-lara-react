import React, { createContext, useReducer } from 'react';
import { initialState, OrdersReducer } from '../Reducers/OrdersReducer';
import {
    GET_GROUPS,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const OrdersContext = createContext();

const OrdersContextProvicer = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(OrdersReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get orders
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_orders = (page, keySearch) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/users/groups/get_list?page=${page}`, {...keySearch})
        .then((res) => {
            let { groups } = res.data;
            let { total, data, current_page, per_page } = groups;
            dispatch({ type: GET_GROUPS, payload: data });
            dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
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
        history, dispatch, get_axios,
        set_table_loading, set_mouted, get_orders
    };

    return (
        <OrdersContext.Provider value={todoContextData}>
            { children }
        </OrdersContext.Provider>
    );
}

export default OrdersContextProvicer;
