import React, { createContext, useReducer } from 'react';
import { initialState, BuilderReducer } from '../Reducers/BuilderReducer';
import {
    GET_MODULES, SET_TABLE_LOADING, MOUTED,
    GET_DATABASES, GET_TABLE
} from '../Dispatch/type';

export const BuilderContext = createContext();

const BuilderContextProvicer = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(BuilderReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get modules
     * @return {void}
     */
    const get_modules = () => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/module/builder/get_modules`)
        .then((res) => {
            let { modules } = res.data;
            dispatch({ type: GET_MODULES, payload: modules });
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get databases by module
     * @param {string} keyID
     * @return {void}
     */
    const get_databases = (keyID) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/module/builder/get_databases`, { module: keyID })
        .then((res) => {
            let { databases } = res.data;
            dispatch({ type: GET_DATABASES, payload: databases });
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get databases by module
     * @param {Object} values
     * @return {void}
     */
    const get_table = (keyID, moduleID) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/module/builder/get_table`, { table: keyID, module: moduleID})
        .then((res) => {
            let { fields, types } = res.data;
            dispatch({ type: GET_TABLE, payload: {
                fields, types
            } });
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: create new module
     * @param {Object} values
     * @return {void}
     */
    const create_module = (values = {}) =>{
        return axios
        .get_secured()
        .post(`/module/builder/create_module`, {...values});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: storage group
     * @param {Object} values
     * @return {void}
     */
    const storage_group = (values) => {
        return axios
        .get_secured()
        .post(`/users/groups/storage`, {...values})
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: update group
     * @param {Object} values
     * @return {void}
     */
    const update_group = (values) => {
        return axios
        .get_secured()
        .post(`/users/groups/update`, {...values})
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: destroy group
     * @param {number} id
     * @return {void}
     */
    const destroy_group = (id) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/users/groups/destroy`, {id});
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
     * @todo: redirect to...
     * @param {Object} params
     * @return {void}
     */
    const setRouter = (params) => {
        const { action, id, module } = params;
        set_mouted(true);
        let parseURL = window.sparrowConfig.app.adminPrefix ? '/' + window.sparrowConfig.app.adminPrefix : '';
        parseURL += `/module/builder`;
        let parseACT = action ? `?action=${action}` : ``;
        let parseKeyID = id ? `&id=${id}` : ``;
        let parseModule = module ? `&module=${module}` : ``;
        return navigate(`${parseURL}${parseACT}${parseKeyID}${parseModule}`, { replace: true });
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get axios
     * @return {Object}
     */
    const get_axios = () => axios;

    const todoContextData = {
        data: {...data, config},
        history, dispatch, get_axios, update_group,
        set_table_loading, set_mouted, get_modules, setRouter, get_databases,
        get_table, create_module
    };

    return (
        <BuilderContext.Provider value={todoContextData}>
            { children }
        </BuilderContext.Provider>
    );
}

export default BuilderContextProvicer;
