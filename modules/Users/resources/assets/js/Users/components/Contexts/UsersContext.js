import React, { createContext, useReducer } from 'react';
import { initialState, UsersReducer } from '../Reducers/UsersReducer';
import {
    GET_USERS, RESET_API_KEY, DELETE_USERS,
    SET_PAGINATION, SET_TABLE_LOADING, SET_FORM_LOADING, SET_DRAWER,
    MOUTED
} from '../Dispatch/type';
import Helper from '../Helper/helper';

export const UsersContext = createContext();

const UsersContextProvicer = ({ children, axios, history, config }) =>{

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

    // const getItemCP = (keyID) => {
    //     return axios
    //     .getSecured()
    //     .get(`/users/users/getitem`, { params: { id: keyID } })
    // }

    // const storageUser = (formData) => {
    //     const config = {
    //         timeout: 1000 * 60 * 2,
    //         headers: { 'content-type': 'multipart/form-data' }
    //     }
    //     return axios
    //     .getSecured()
    //     .post(`/users/users/storage`, formData, config)
    // }

    // const updateUser = (formData) => {
    //     const config = {
    //         timeout: 1000 * 60 * 2,
    //         headers: { 'content-type': 'multipart/form-data' }
    //     }
    //     return axios
    //     .getSecured()
    //     .post(`/users/users/edit`, formData, config)
    // }

    // const deleteUser = (id) =>{
    //     setTable();
    //     return axios
    //     .getSecured()
    //     .post(`/users/users/delete`, {id})
    //     .then((res) => {
    //         let { status, message } = res.data;
    //         if (status) {
    //             dispatch({ type: DELETE_USERS, payload: id });
    //             Helper.Noti('success', '[Users] Delete', message);
    //         } else {
    //             Helper.Noti('error', '[Users] Delete', message);
    //         }
    //     })
    //     .catch((error) => {
    //     }).finally(() =>{
    //         setTable();
    //     })
    // }

    // const accessUser = (id) =>{
    //     return axios
    //     .getSecured()
    //     .post(`/users/access/access`, {id})
    // }

    // const getGroups = (page, keySearch) => {
    //     return axios
    //     .getSecured()
    //     .get(`/users/users/get_groups`, { params: {...keySearch, page:page}})

    // }

    // const getPublishers = (page, keySearch) => {
    //     return axios
    //     .getSecured()
    //     .get(`/users/users/get_publishers`, { params: {...keySearch, page:page}})
    // }

    // const setRouter = (action, id = "") => {
    //     setMouted(true);
    //     let paseURL = window.sparrowConfig.app.adminPrefix ? '/'+window.sparrowConfig.app.adminPrefix : "";
    //     paseURL += `/users/users`;
    //     let paseACT = action ? `?action=${action}` : ``;
    //     let paseKeyID = id ? `&id=${id}` : ``;
    //     return history.push(`${paseURL}${paseACT}${paseKeyID}`);
    // }

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
    const get_axios = () =>{
        return axios;
    }

    const todoContextData = {
        data: {...data, config}, history, dispatch, get_axios, get_users,
        set_mouted, set_table_loading,
        // setForm, setTable, setMouted, setDrawer, setRouter,
        // getUsers, storageUser, updateUser, deleteUser, accessUser,
        // getItemCP,
        // getGroups, getPublishers,
    };
    return (
        <UsersContext.Provider value={todoContextData}>
            {children}
        </UsersContext.Provider>
    );
}
export default UsersContextProvicer;
