import React, { createContext, useReducer } from 'react';
import { initialState, NotificationReducer } from '../Reducers/NotificationReducer';
import {
    GET_NOTIFICATIONS,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';
import { createSearchParams } from 'react-router-dom';
export const NotificationContext = createContext();

const NotificationContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(NotificationReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get notifications
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_notifications = (page = 1, keySearch = '') => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/notifications/notifications/get_notifications_by_auth?page=${page}`, {...keySearch})
        .then((res) => {
            let { status, data } = res.data;
            if(status) {
                let { notifications } = data;
                dispatch({ type: GET_NOTIFICATIONS, payload: notifications });
                // dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }


    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: Marking notifications as read
     * @param {string} id
     * @return {void}
     */
     const mask_as_read_notification = (id) => {
        // set_table_loading();
        // return axios
        // .get_secured()
        // .post(`/notifications/notifications/get_notifications_by_auth?page=${page}`, {...keySearch})
        // .then((res) => {
        //     let { status, data } = res.data;
        //     if(status) {
        //         let { notifications } = data;
        //         dispatch({ type: GET_NOTIFICATIONS, payload: notifications });
        //         // dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
        //     }
        // })
        // .catch((errors) => {})
        // .finally(() => {set_table_loading();});
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
        data: {...data, config},
        history, dispatch, get_axios, get_notifications,
        set_table_loading, set_mouted, setRouter
    };

    return (
        <NotificationContext.Provider value={todoContextData}>
            { children }
        </NotificationContext.Provider>
    );
}

export default NotificationContextProvider;
