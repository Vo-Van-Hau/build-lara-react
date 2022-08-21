import { SET_CONFIG } from '../Dispatch/type';

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
    language: {
        locales: [],
        locale: 'en'
    }
}

export const AuthReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
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
        default: return state;
    }
};
