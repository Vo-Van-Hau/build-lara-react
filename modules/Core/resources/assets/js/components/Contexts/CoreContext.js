import React, { createContext, useReducer } from "react";
import { initialState, CoreReducer } from "../Reducers/CoreReducer";
import { GET_MODULE, SET_LOCATE, CHANGE_SIDER} from "../Dispatch/type";
import api from "../../helpers/api";

export const CoreContext = createContext();

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns
 */
const CoreContextProvicer = ({ children, axios, history }) => {

    const [data, dispatch] = useReducer(CoreReducer, initialState);

    const getModule = () => {

        return api
            .getSecured()
            .get(
                `${window.sparrowConfig.app.backendURL}/api/core/core/get_modules`
            )
            .then(res => {
                let { language, menus, modules, user, config, access_user } = res.data;
                if(user){
                    let { default_adserver } = user;
                    if(default_adserver){
                        config.app.adserverName = default_adserver.name;
                    }
                }
                dispatch({
                    type: GET_MODULE,
                    payload: {
                        config,
                        user,
                        access_user,
                        menus,
                        modules,
                        language
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getAxios = () => {
        return axios;
    };

    const todoContextData = {
        data,
        dispatch,
        getAxios,
        getModule
    };

    return (
        <CoreContext.Provider value={todoContextData}>
            {children}
        </CoreContext.Provider>
    );
};

export default CoreContextProvicer;
