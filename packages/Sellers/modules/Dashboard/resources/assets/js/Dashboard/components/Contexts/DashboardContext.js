import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, DashboardReducer } from '../Reducers/DashboardReducer';
import {
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED, GET_OVERVIEW,
} from '../Dispatch/type';

export const DashboardContext = createContext();

const DashboardContextProvicer = ({ children, axios, history, config, nagivation }) => {

    const [data, dispatch] = useReducer(DashboardReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get overview
     * @param {Object} data
     * @return {void}
     */
    const get_overview = (data) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/dashboard/dashboard/get_overview`, {...data})
        .then((res) => {
            let { status, data } = res.data;
            if(status) {
                let { overview } = data;
                dispatch({ type: GET_OVERVIEW, payload: overview });
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
        data: {...data, config}, get_overview,
        history, dispatch, get_axios, set_table_loading, set_mouted,
    };

    return (
        <DashboardContext.Provider value={todoContextData}>
            { children }
        </DashboardContext.Provider>
    );
}

export default DashboardContextProvicer;
