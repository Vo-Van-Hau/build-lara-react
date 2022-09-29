import {
    GET_CART, SET_PAGINATION, GET_PAYMENT_METHODS,
    SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const initialState = {
    cart: {
        cart_detail: [],
        user: {}
    },
    payment_methods: [],
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

export const PaymentReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type) {
        case GET_CART:
            return {...state, cart: {...payload}};
        case GET_PAYMENT_METHODS:
            return {...state, payment_methods: [...payload]};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
