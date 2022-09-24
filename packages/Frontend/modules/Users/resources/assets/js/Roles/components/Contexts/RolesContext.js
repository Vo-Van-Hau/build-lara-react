import React, { createContext, useReducer } from 'react';
import { initialState, RolesReducer } from '../Reducers/RolesReducer';
import {
    GET_ROLES, SET_USER_ROLES,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const RolesContext = createContext();

const RolesContextProvicer = ({ children, axios, history, config }) =>{

    const [data, dispatch] = useReducer(RolesReducer, initialState);

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

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: storage role
     * @param {Object} values
     * @return {void}
     */
    const storage_role = (values) => {
        return axios
        .get_secured()
        .post(`/users/roles/storage`, {...values});

    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} values
     * @return {void}
     */
    const update_role = (values) => {
        return axios
        .get_secured()
        .post(`/users/roles/update`, {...values});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {number} id
     * @return {void}
     */
    const destroy_role = (id) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/users/roles/destroy`, {id});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get all users in role
     * @param {number} id
     * @return {void}
     */
    const get_users_by_role = (id) =>{
        return axios
        .get_secured()
        .post(`/users/roles/get_users`, {id});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get users
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
     const get_users = (page, keySearch) => {
        return axios
        .get_secured()
        .post(`/users/users/get_list?page=${page}`, {...keySearch});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: storage user to role
     * @param {Object} values
     * @return {void}
     */
    const storage_user_to_role = (values) =>{
        return axios
        .get_secured()
        .post(`/users/roles/storage_user_to_role`, {...values});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return {void}
     */
    const init_acl_role = () => {
        return axios
        .get_secured()
        .post(`/users/roles/get_init_acl_role`);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} values
     * @return {void}
     */
    const get_acl = (values) => {
        return axios
        .get_secured()
        .post(`/users/roles/get_acl_role`, {...values});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} values
     * @return {void}
     */
    const save_acl_role = (values) =>{
        return axios
        .get_secured()
        .post(`/users/roles/save_acl_role`, {...values});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: reset users
     * @param {number} id
     * @param {array} users
     * @param {Object} user
     * @return {void}
     */
    const set_user_role = (id, users, user) => {
        dispatch({type: SET_USER_ROLES, payload: {id, users, user}});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: set table loading...
     * @return {void}
     */
    const set_table_loading = () => {
        dispatch({ type: SET_TABLE_LOADING });
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {Object} values
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
        set_mouted, get_roles, set_table_loading, storage_user_to_role,
        storage_role, update_role, destroy_role, init_acl_role,
        get_users_by_role, get_users, set_user_role, get_acl, save_acl_role
    };

    return (
        <RolesContext.Provider value={todoContextData}>
            {children}
        </RolesContext.Provider>
    );
}
export default RolesContextProvicer;
