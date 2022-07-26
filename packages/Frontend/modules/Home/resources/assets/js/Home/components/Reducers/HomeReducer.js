import {
    SET_PAGINATION,
    GET_PRODUCT_CATEGORIES,GET_PRODUCTS,
    SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const initialState = {
    product_categories: [],
    products: [],
    config:{
        status: []
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

export const HomeReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_PRODUCT_CATEGORIES:
            return {...state, product_categories: [...payload]};
        case GET_PRODUCTS:
            return {...state, products: [...payload]};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
