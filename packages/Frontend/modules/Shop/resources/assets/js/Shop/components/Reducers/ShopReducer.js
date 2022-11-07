import {
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED, GET_SELLER_PRODUCTS,
    GET_SHOP,
} from '../Dispatch/type';

export const initialState = {
    products: [],
    shop: {
        store: {
            name: '',
            joined_date: '00/00/0000'
        }
    },
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

export const ShopReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type) {
        case GET_SELLER_PRODUCTS:
            return {...state, products: [...payload]};
        case GET_SHOP:
            return {...state, shop: {...payload}};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
