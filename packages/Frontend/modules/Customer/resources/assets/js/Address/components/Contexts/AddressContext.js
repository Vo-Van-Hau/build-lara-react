import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, AddressReducer } from '../Reducers/AddressReducer';
import {
    GET_ADDRESS, GET_AREAS, GET_DISTRICTS, GET_WARDS,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';
import Helper from '../Helper/Helper';

export const AddressContext = createContext();

const AddressContextProvider = ({ children, axios, history, config,navigate }) => {

    const [data, dispatch] = useReducer(AddressReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get address
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_address = (page, keySearch) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/address/address/get_customer_address?page=${page}`, {...keySearch})
        .then((res) => {
            let { status, data, message } = res.data;
            let { address } = data;
            dispatch({ type: GET_ADDRESS, payload: address });
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get areas
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
    const get_areas = (page, keySearch) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/address/address/get_areas?page=${page}`, {...keySearch})
        .then((res) => {
            let { status } = res.data;
            if(status) {
                let { areas } = res.data.data;
                dispatch({ type: GET_AREAS, payload: areas });
                // dispatch({ type: SET_PAGINATION, payload: { total, current: current_page, defaultPageSize: per_page } })
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get districts
     * @param {number} province_id
     * @return {void}
     */
    const get_districs_by_province = (province_id = 0) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/address/address/get_districs_by_province`, {province_id})
        .then((res) => {
            let { status } = res.data;
            if(status) {
                let { districts } = res.data.data;
                dispatch({ type: GET_DISTRICTS, payload: districts });
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

     /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: get wards
     * @param {number} district_id
     * @return {void}
     */
    const get_wards_by_district = (district_id = 0) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/address/address/get_wards_by_district`, {district_id})
        .then((res) => {
            let { status } = res.data;
            if(status) {
                let { wards } = res.data.data;
                dispatch({ type: GET_WARDS, payload: wards });
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

     /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: save new address
     * @param {array} data
     * @return {void}
     */
    const save_address = (data) => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/address/address/save_new`, {...data})
        .then((res) => {
            let { status, message } = res.data;
            if(status) {
                get_address(1, {});
                setRouter({
                    module: 'customer',
                    controller: 'address',
                    action: '#',
                    id: '#',
                });
                Helper.Notification('success', '[Save a new address]', message);
            } else {
                Helper.Notification('error', '[Save a new address]', message);
            }
        })
        .catch((errors) => {})
        .finally(() => {set_table_loading();});
    }

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
        history, dispatch, get_axios, set_table_loading, set_mouted,
        setRouter, get_address, get_areas, get_districs_by_province,
        get_wards_by_district, save_address
    };

    return (
        <AddressContext.Provider value={todoContextData}>
            { children }
        </AddressContext.Provider>
    );
}

export default AddressContextProvider;
