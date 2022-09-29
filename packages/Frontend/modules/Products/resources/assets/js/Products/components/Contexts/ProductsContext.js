import React, { createContext, useReducer } from 'react';
import { createSearchParams } from 'react-router-dom';
import { initialState, ProductsReducer } from '../Reducers/ProductsReducer';
import {
    GET_PRODUCTS, SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children, axios, history, config, navigate }) => {

    const [data, dispatch] = useReducer(ProductsReducer, initialState);

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
     * @todo: get groups
     * @param {string} page
     * @param {string} keySearch
     * @return {void}
     */
     const get_products = () => {
        set_table_loading();
        return axios
        .get_secured()
        .post(`/products/products/get_list`)
        .then((res) => {
            let { products } = res.data;
            let { data } = products;
            dispatch({ type: GET_PRODUCTS, payload: data });
        })
        .catch((errors) => {})
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
        history, dispatch, get_axios, storage_group,
        get_products,
        get_parent_groups, update_group, destroy_group, 
        set_table_loading, set_mouted, setRouter
    };

    return (
        <ProductsContext.Provider value={todoContextData} >
            { children }
        </ProductsContext.Provider>
    );
}

export default ProductsContextProvider;
