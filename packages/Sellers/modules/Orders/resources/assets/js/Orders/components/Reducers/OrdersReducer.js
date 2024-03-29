import {
    GET_ORDERS, SET_PAGINATION, GET_ORDER_TRACKING_DETAIL,
    SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const initialState = {
    orders: [],
    order_tracking_detail: {
        current_tracking: [],
        next_tracking_status: {
            title: '',
            order_tracking_group_status: {
                title: '',
            }
        },
        is_order_cancelled: 0,
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

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
export const OrdersReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_ORDERS:
            return {...state, orders: [...payload]};
        case GET_ORDER_TRACKING_DETAIL:
            return {...state, order_tracking_detail: {...payload}};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
