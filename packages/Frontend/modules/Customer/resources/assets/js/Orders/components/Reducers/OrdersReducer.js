import {
    GET_ORDERS_HISTORY, SET_PAGINATION, SET_DETAIL_ITEM,
    SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const initialState = {
    orders: [],
    detail_item: {
        order_detail: [],
        country: {
            id: 0,
            name: '',
            type: '',
            status: '',
        },
        province: {
            id: 0,
            name: '',
            type: '',
            status: '',
        },
        district: {
            id: 0,
            name: '',
            type: '',
            status: '',
        },
        ward: {
            id: 0,
            name: '',
            type: '',
            status: '',
        },
        payment_method: {
            id: 0,
            name: '',
            status: '',
        }, 
        estimated_delivery_date: {
            date: '', time: ''
        }
    },
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

export const OrdersReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_ORDERS_HISTORY:
            return {...state, orders: [...payload]};
        case SET_DETAIL_ITEM:
            return {...state, detail_item: {...payload}};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
