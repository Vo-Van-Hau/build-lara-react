import { GET_MODULE, SET_LOCATE, CHANGE_SIDER } from '../Dispatch/type';

export const initialState = {
    config: {
        app: {
            name: 'Sparrow CMS',
            version: '1.00.000',
            baseURL: '',
            backendURL: '',
            assetURL: '',
            uploadURL: '',
            mediaURL: '',
            adminPrefix: ''
        }
    },
    user: {},
    access_user: false,
    siderBar: {
        collapsed: false
    },
    menus: [],
    modules: [],
    language: {
        locales: [],
        locale: 'en'
    }
};

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo: CoreReducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
export const CoreReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_MODULE:
            let { lang } = payload.language;
            Object.entries(lang).forEach(([key, lang]) => {
                Object.entries(lang).forEach(([namespace, resources]) => {

                });
            });
            return {
                ...state,
                config: payload.config,
                menus: payload.menus,
                modules: payload.modules,
                language: payload.language
            };
        default: return state;
    }
};
