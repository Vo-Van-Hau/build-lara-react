import {
    GET_SELLERS, SET_PAGINATION, SET_TABLE_LOADING, SET_FORM_LOADING, SET_DRAWER,
    MOUTED, LOADING_STATE,
} from '../Dispatch/type';

export const initialState = {
    sellers: [],
    config:{
        status: [],
        account_type: [],
        users_type: [],
        currencies: [],
        roles: [],
        user: {}
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
    loadingState: false,
    visible: false,
    mouted: true
}

export const SellersReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type) {
        case GET_SELLERS:
            return {...state, sellers: [...payload]};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case SET_FORM_LOADING:
            return { ...state, loadingForm: !state.loadingForm };
        case LOADING_STATE:
            return {...state, loadingState: !state.loadingState};
        case SET_DRAWER:
            return { ...state, visible: !state.visible };
        case MOUTED:
            return {...state, mouted: payload};
        default:
            return state;
    }
}
