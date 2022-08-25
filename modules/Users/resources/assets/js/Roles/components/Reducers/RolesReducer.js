import {
    GET_ROLES, SET_USER_ROLES,
    SET_PAGINATION, SET_TABLE_LOADING, SET_FORM_LOADING, SET_DRAWER,
    MOUTED
} from '../Dispatch/type';

export const initialState = {
    roles: [],
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

export const RolesReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_ROLES:
            return {...state, roles: [...payload]};
        // case SET_USER_ROLES:
        //     let {id, users, user} = payload;
        //     let { Roles } = state;
        //     // xử lý group select
        //     let index = Roles.findIndex(item => item.id === id);
        //     let record = Roles.find(item => item.id === id);
        //     Roles[index] = {...record, users:[...users]};
        //     // xử lý group cũ của user
        //     let indexCP = Roles.findIndex(item => item.id === user.role_id);
        //     let recordCP = Roles.find(item => item.id === user.role_id);
        //     if(recordCP && recordCP['users']){
        //         let user_old = recordCP.users;
        //         let userCP = user_old.filter(item => item.id !== user.id);
        //         Roles[indexCP] = {...recordCP, users:[...userCP]};
        //     }
        //     // xong
        //     return { ...state, Roles:[...Roles] };
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
