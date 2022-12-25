import {
    GET_PRODUCTS, SET_PAGINATION, GET_PRODUCT_CATEGORIES,
    SET_TABLE_LOADING, MOUTED, GET_ITEM
} from '../Dispatch/type';

export const initialState = {
    products: [],
    item: {},
    categories: [],
    config: {
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

export const ProductsReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type) {
        case GET_PRODUCTS:
            return {...state, products: [...payload]};
        case GET_PRODUCT_CATEGORIES:
            return {...state, categories: [...payload]};
        case GET_ITEM:
            return {...state, item: {...payload}};
        case SET_PAGINATION:
            return {...state, pagination: {...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
