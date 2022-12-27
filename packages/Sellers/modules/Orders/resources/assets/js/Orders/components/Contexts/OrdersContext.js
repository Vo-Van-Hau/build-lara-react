import React, { createContext, useReducer } from 'react';
import { initialState, OrdersReducer } from '../Reducers/OrdersReducer';
import {
    GET_ORDER_TRACKING_DETAIL,
    GET_ORDERS, SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';
import { createSearchParams } from 'react-router-dom';
import Helper from '../Helper/Helper';
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
    const get_orders = (page = 1, keySearch = '') => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/orders/orders/get_orders_sellers?page=${page}`, {...keySearch})
        .then((res) => {
            const { status } = res.data;
            if(status) {
                let { orders } = res.data.data;
                // let { data, current_page, per_page, total } = orders;
                dispatch({ type: GET_ORDERS, payload: orders ? orders : [] });
                // dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get order tracking detail
     * @param {Object} data
     * @return {void}
     */
    const get_order_tracking_detail = (data) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/orders/orders/get_order_tracking_detail`, {...data})
        .then((res) => {
            const { status, message, data } = res.data;
            if(status) {
                const { tracking } = data;
                const { current_tracking, next_tracking_status } = tracking;
                if(current_tracking && next_tracking_status) {
                    dispatch({
                        type: GET_ORDER_TRACKING_DETAIL,
                        payload: {...tracking}
                    });
                }
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: create order tracking detail
     * @param {Object} data
     * @return {void}
     */
    const create_order_tracking_detail = (data) => {
        let input = data;
        set_table_loading();
        return axios
        .get_secured()
        .post(`/orders/orders/create_order_tracking_detail`, {...data})
        .then((res) => {
            const { status, message } = res.data;
            if(status) {
                Helper.Notification('success', '[Cập nhật trạng thái đơn hàng]', 'Cập nhật thành công');
                get_order_tracking_detail({
                    order_detail_id: input.order_detail_id,
                    order_id: input.order_id,
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
        data: {...data, config}, setRouter, create_order_tracking_detail,
        history, dispatch, get_axios, get_order_tracking_detail,
        set_table_loading, set_mouted, get_orders
    };

    return (
        <OrdersContext.Provider value={todoContextData}>
            { children }
        </OrdersContext.Provider>
    );
}

export default OrdersContextProvicer;
