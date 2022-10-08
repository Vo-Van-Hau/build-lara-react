import {
    GET_GROUPS, SET_USER_GROUPS, SET_PAGINATION,
    SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const initialState = {
    groups:[],
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

export const AddressReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_GROUPS:
            return {...state, groups: [...payload]};
        case SET_USER_GROUPS:
            let {id, users} = payload;
            let { groups } = state;
            let index = groups.findIndex(item => item.id === id);
            let record = groups.find(item => item.id === id);
            groups[index] = {...record, users:[...users]};
            return {...state, groups: [...groups]};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
