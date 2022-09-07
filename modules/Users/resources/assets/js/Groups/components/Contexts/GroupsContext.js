import React, { createContext, useReducer } from 'react';
import { initialState, GroupsReducer } from '../Reducers/GroupsReducer';
import {
    GET_GROUPS, SET_USER_GROUPS,
    SET_PAGINATION, SET_TABLE_LOADING, SET_FORM_LOADING, SET_DRAWER,
    MOUTED
} from '../Dispatch/type';

export const GroupsContext = createContext();

const GroupsContextProvicer = ({ children, axios, history, config }) => {

    const [data, dispatch] = useReducer(GroupsReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_groups = (page, keySearch) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/users/groups/get_list?page=${page}`, {...keySearch})
        .then((res) => {
            let { groups } = res.data;
            let { total, data, current_page, per_page } = groups;
            dispatch({ type: GET_GROUPS, payload: data });
            dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
        }).catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_parent_groups = () =>{
        return axios
        .get_secured()
        .post(`/users/groups/get_parents`);
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
        .post(`/users/groups/storage`, {...values});
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
        .post(`/users/groups/update`, {...values});
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

    // const getUserbyGroups = (id) =>{
    //     return axios
    //     .getSecured()
    //     .post(`/users/groups/get_users`, {id})
    // }

    // const getUsers = (page, keySearch) => {
    //     return axios
    //     .getSecured()
    //     .post(`/users/users/getlist?page=${page}`, {...keySearch})
    // }

    // const storageGroupUser = (values) =>{
    //     return axios
    //     .getSecured()
    //     .post(`/users/groups/storage_user_group`, {...values})
    // }

    // const setUserGroup = (id, users, user) => {
    //     dispatch({ type: SET_USER_GROUPS, payload:{id, users, user}});
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
        data: {...data, config},
        history, dispatch, get_axios, storage_group,
        get_parent_groups, update_group, destroy_group,
        // getUserbyGroups, getUsers, setUserGroup, storageGroupUser,
        // setForm,
        set_table_loading,
        set_mouted,
        // setDrawer,
        get_groups
    };

    return (
        <GroupsContext.Provider value={todoContextData}>
            { children }
        </GroupsContext.Provider>
    );
}

export default GroupsContextProvicer;
