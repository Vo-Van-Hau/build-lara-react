import React, { createContext, useReducer } from 'react';
import { initialState, CoreReducer } from '../Reducers/CoreReducer';
import { GET_MODULE} from '../Dispatch/type';
import api from '../../helpers/api';

export const CoreContext = createContext();

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns
 */
const CoreContextProvicer = ({ children, axios, history }) => {

    const [data, dispatch] = useReducer(CoreReducer, initialState);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param
     * @returns {void}
     */
    const get_module = () => {
        return api
        .get_secured()
        .get(
            `${window.sparrowConfig.app.backendURL}/api/core/core/get_module`
        )
        .then(res => {
            let { language, menus, modules, config } = res.data;
            console.log(res);
            dispatch({
                type: GET_MODULE,
                payload: {
                    config,
                    menus,
                    modules,
                    language
                }
            });
        });
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param /
     * @returns {Object}
     */
    const get_axios = () => {
        return axios;
    };

    const todoContextData = {
        data,
        dispatch,
        get_axios,
        get_module
    };

    return (
        <CoreContext.Provider value={todoContextData}>
            {children}
        </CoreContext.Provider>
    );
};

export default CoreContextProvicer;
