import {
    SET_PAGINATION, GET_OVERVIEW,
    SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const initialState = {
    config: {
        status: []
    },
    overview: {
        products: {
            data: [],
            total: 0,
        },
        orders: {
            data: [],
            total: 0,
            orders_in_year: [],
        }
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

export const DashboardReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_OVERVIEW:
            return {...state, overview: { ...payload }};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
