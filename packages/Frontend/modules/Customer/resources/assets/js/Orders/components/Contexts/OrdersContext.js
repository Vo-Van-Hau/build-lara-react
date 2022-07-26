import React, { createContext, useReducer } from 'react';
import { initialState, OrdersReducer } from '../Reducers/OrdersReducer';
import {
    GET_ORDERS_HISTORY, SET_DETAIL_ITEM, SET_TABLE_LOADING,
    MOUTED
} from '../Dispatch/type';
import { createSearchParams } from 'react-router-dom';

export const OrdersContext = createContext();

const OrdersContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(OrdersReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get orders in history
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_orders_history = (page, keySearch) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/orders/orders/get_orders_history?page=${page}`, {...keySearch})
        .then((res) => {
            let { status, data } = res.data;
            if(status) {
                let { orders } = data;
                // let { total, data, current_page, per_page } = groups;
                dispatch({ type: GET_ORDERS_HISTORY, payload: orders });
                // dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

        /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get detail
     * @param {Object} data
     * @return {void}
     */
    const get_detail = (data) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/orders/orders/get_detail`, {...data})
        .then((res) => {
            let { status, data } = res.data;
            if(status) {
                let { result } = data;
                dispatch({ type: SET_DETAIL_ITEM, payload: result });
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
        data: {...data, config}, get_detail,
        history, dispatch, get_axios, set_table_loading,
        set_mouted, get_orders_history, setRouter
    };

    return (
        <OrdersContext.Provider value={todoContextData}>
            { children }
        </OrdersContext.Provider>
    );
}

export default OrdersContextProvider;
