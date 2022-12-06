import {
    SET_CONFIG, SET_TABLE_LOADING, GET_PRODUCT_CATEGORIES,
} from '../Dispatch/type';

export const initialState = {
    product_categories: [],
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
    language: {
        locales: [],
        locale: 'en'
    },
    pagination: {
        current: 1,
        defaultCurrent: 1,
        total: 0,
        defaultPageSize: 10,
        showSizeChanger: false
    },
    loading_table: false,
    loadingForm: false,
    visible: false,
    mouted: true
}

export const AuthReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type) {
        case SET_CONFIG:
            let { lang } = payload.language;
            Object.entries(lang).forEach(([key, lang]) => {
                Object.entries(lang).forEach(([namespace, resources]) => {});
            });
            return {
                ...state,
                config: payload.config,
                language: payload.language
            };
        case GET_PRODUCT_CATEGORIES:
            return {...state, product_categories: [...payload]};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        default: return state;
    }
};
