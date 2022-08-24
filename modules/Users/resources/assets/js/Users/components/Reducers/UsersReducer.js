import {
    GET_USERS, RESET_API_KEY, DELETE_USERS,
    SET_PAGINATION, SET_TABLE_LOADING, SET_FORM_LOADING, SET_DRAWER,
    MOUTED
} from '../Dispatch/type';

export const initialState = {
    users: [],
    config:{
        status: [],
        account_type: [],
        users_type: [],
        currencies: [],
        roles: [],
        user: {}
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
export const UsersReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_USERS:
            return {...state, users: [...payload]};
        // case DELETE_USERS:
        //     let newUsers = state.Users.filter(item => item.id !== payload);
        //     return { ...state, Users: newUsers, pagination: { ...state.pagination, total: state.pagination.total - 1 } };
        // case RESET_API_KEY:
        //     let UserCP = state.Users;
        //     let UsersIndex = UserCP.findIndex(item => item.id === payload.id);
        //     let UsersRecord = UserCP.find(item => item.id === payload.id);
        //     UserCP[UsersIndex] = {...UsersRecord, api_keys:{key: payload.key}};
        //     return { ...state, Users: [...UserCP] };
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        // case SET_FORM_LOADING:
        //     return { ...state, loadingForm: !state.loadingForm };
        // case SET_DRAWER:
        //     return { ...state, visible: !state.visible };
        case MOUTED:
            return {...state, mouted: payload};
        default:
            return state;
    }
}
