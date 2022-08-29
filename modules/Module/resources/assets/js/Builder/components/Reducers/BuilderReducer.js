import {
    GET_MODULES, SET_TABLE_LOADING, MOUTED,
    GET_DATABASES, GET_TABLE
} from '../Dispatch/type';

export const initialState = {
    modules: [],
    databases: [],
    table: {
        fields: [],
        types: []
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
    visible: false,
    mouted: true
}

export const BuilderReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_MODULES:
            return {...state, modules: [...payload]};
        case GET_DATABASES:
            return {...state, databases: [...payload]};
        case GET_TABLE:
            return {...state, table: {...state.table, ...payload}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
