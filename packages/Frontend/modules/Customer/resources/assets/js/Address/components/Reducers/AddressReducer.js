import {
    GET_ADDRESS, GET_AREAS, GET_DISTRICTS,
    SET_PAGINATION, GET_WARDS, GET_ITEM,
    SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const initialState = {
    address: [],
    item: {},
    areas: {
        countries: {
            provinces: [],
            districts: [],
            wards: []
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

export const AddressReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_ADDRESS:
            return {...state, address: [...payload]};
        case GET_AREAS:
            return {...state, areas: {...payload}};
        case GET_DISTRICTS:
            var areas = state.areas;
            areas.countries.districts = payload;
            areas.countries.wards = [];
            return {...state, areas: {...areas}};
        case GET_WARDS:
            var areas = state.areas;
            areas.countries.wards = payload;
            return {...state, areas: {...areas}};
        case GET_ITEM:
            return {...state, item: {...payload}};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
