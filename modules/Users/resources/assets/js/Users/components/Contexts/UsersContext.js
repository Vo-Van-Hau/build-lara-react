import React, { createContext, useReducer } from 'react';
import { initialState, UsersReducer } from '../Reducers/UsersReducer';
import {
    GET_USERS, RESET_API_KEY, DELETE_USERS,
    SET_PAGINATION, SET_TABLE_LOADING, SET_FORM_LOADING, SET_DRAWER,
    MOUTED
} from '../Dispatch/type';
import Helper from '../Helper/Helper';
export const UsersContext = createContext();

const UsersContextProvicer = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(UsersReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get users
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_users = (page, keySearch) => {
        set_table_loading();
        return axios
            .get_secured()
            .post(`/users/users/get_list?page=${page}`, {...keySearch})
            .then((res) => {
                let { users } = res.data;
                let { total, data, current_page, per_page } = users;
                dispatch({ type: GET_USERS, payload: data });
                dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } });
            })
            .catch((errors) => {})
            .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {number} id
     * @return {void}
     */
    const get_user = (keyID) => {
        return axios
        .get_secured()
        .post(`/users/users/get_user`, {id: keyID });
    }

    const storage_user = (formData) => {
        const config = {
            timeout: 1000 * 60 * 2,
            headers: { 'content-type': 'multipart/form-data' }
        }
        return axios
        .get_secured()
        .post(`/users/users/storage`, formData, config)
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: update user
     * @param {Object} values
     * @return {void}
     */
    const update_user = (formData) => {
        const config = {
            timeout: 1000 * 60 * 2,
            headers: { 'content-type': 'multipart/form-data' }
        }
        return axios
        .get_secured()
        .post(`/users/users/update`, formData, config);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {number} id
     * @return {void}
     */
    const destroy_user = (id) =>{
        set_table_loading();
        return axios
        .get_secured()
        .post(`/users/users/destroy`, {id});
    }

    // const accessUser = (id) =>{
    //     return axios
    //     .getSecured()
    //     .post(`/users/access/access`, {id})
    // }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_groups = (page, keySearch) => {
        return axios
        .get_secured()
        .post(`/users/users/get_groups`, {...keySearch, page})
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_publishers = (page, keySearch) => {
        return axios
        .get_secured()
        .post(`/users/users/get_publishers`, {...keySearch, page})
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: redirect to...
     * @param {string} action
     * @param {string} id
     * @return {void}
     */
    const setRouter = (action, id = '') => {
        set_mouted(true);
        let paseURL = window.sparrowConfig.app.adminPrefix ? '/' + window.sparrowConfig.app.adminPrefix : '';
        paseURL += `/users/users`;
        let paseACT = action ? `?action=${action}` : ``;
        let paseKeyID = id ? `&id=${id}` : ``;
        return navigate(`${paseURL}${paseACT}${paseKeyID}`, { replace: true });
    }

    // const setForm = () => {
    //     dispatch({ type: SET_FORM_LOADING });
    // }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: set table loading...
     * @return {void}
     */
     const set_table_loading = () => {
        dispatch({ type: SET_TABLE_LOADING })
    }

    // const setDrawer = () => {
    //     dispatch({ type: SET_DRAWER });
    // }

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
        data: {...data, config}, history, dispatch, get_axios, get_users,
        set_mouted, set_table_loading, setRouter, get_groups, get_publishers,
        storage_user, destroy_user, get_user, update_user
        // setForm, setDrawer,
        // accessUser,
    };
    return (
        <UsersContext.Provider value={todoContextData}>
            {children}
        </UsersContext.Provider>
    );
}
export default UsersContextProvicer;
