import React, { createContext, useReducer } from 'react';
import { initialState, RolesReducer } from '../Reducers/RolesReducer';
import {
    GET_ROLES, SET_USER_ROLES,
    SET_PAGINATION, SET_TABLE_LOADING, SET_FORM_LOADING, SET_DRAWER,
    MOUTED
} from '../Dispatch/type';
import Helper from '../Helper/helper';
export const RolesContext = createContext();

const RolesContextProvicer = ({ children, axios, history, config }) =>{

    const [data, dispatch] = useReducer(RolesReducer, initialState);

    // const getUsers = (page, keySearch) => {
    //     return axios
    //     .getSecured()
    //     .post(`/users/users/getlist?page=${page}`, {...keySearch})
    // }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get roles
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_roles = (page, keySearch) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/users/roles/get_list?page=${page}`, {...keySearch})
        .then((res) => {
            let { roles } = res.data;
            let { total, data, current_page, per_page } = roles;
            dispatch({ type: GET_ROLES, payload: data });
            dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    // const storageRole = (values) => {
    //     return axios
    //     .getSecured()
    //     .post(`/users/roles/storage`, {...values})

    // }

    // const updateRole = (values) => {
    //     return axios
    //     .getSecured()
    //     .post(`/users/roles/edit`, {...values})
    // }

    // const destroyRoles = (id) => {
    //     return axios
    //     .getSecured()
    //     .post(`/users/roles/delete`, {id})
    //     .then((res) => {
    //         let { status, mess } = res.data;
    //         if (status) {
    //             getRoles(1, {});
    //             Helper.Noti('success', '[Delete Role]', mess);
    //         } else {
    //             Helper.Noti('error', '[Delete Role]', mess);
    //         }
    //     }).catch((err) => { })
    // }

    // const getUserbyRoles = (id) =>{
    //     return axios
    //     .getSecured()
    //     .post(`/users/roles/get_users`, {id})
    // }

    // const storageRoleUser = (values) =>{
    //     return axios
    //     .getSecured()
    //     .post(`/users/roles/storage_user_role`, {...values})
    // }


    // const initRoles = () => {
    //     return axios
    //     .getSecured()
    //     .post(`/users/roles/get_init_acl_role`)

    // }

    // const getAcl = (values) => {
    //     return axios
    //     .getSecured()
    //     .post(`/users/roles/get_acl_role`, {...values})
    // }

    // const saveAcl = (values) =>{
    //     return axios
    //     .getSecured()
    //     .post(`/users/roles/save_acl_role`, {...values})
    // }

    // const setUserGroup = (id, users, user) => {
    //     dispatch({ type: SET_USER_ROLES, payload:{id, users, user}});
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
    const get_axios = () => axios;

    const todoContextData = {
        data:{...data, config}, history, dispatch, get_axios,
        set_mouted, get_roles, set_table_loading
        // setForm, setTable, setMouted, setDrawer,
        // getRoles, storageRole, updateRole, destroyRoles, getUserbyRoles,
        // getUsers, storageRoleUser, setUserGroup,
        // initRoles, getAcl, saveAcl
    };

    return (
        <RolesContext.Provider value={todoContextData}>
            {children}
        </RolesContext.Provider>
    );
}
export default RolesContextProvicer;
