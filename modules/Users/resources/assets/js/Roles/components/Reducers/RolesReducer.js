import {
    GET_ROLES, SET_USER_ROLES,
    SET_PAGINATION, SET_TABLE_LOADING, MOUTED
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
        case SET_USER_ROLES:
            let {id, users, user} = payload;
            let { roles } = state;
            // selected role
            let index = roles.findIndex(item => item.id === id);
            let record = roles.find(item => item.id === id);
            roles[index] = {...record, users: [...users]};
            // updated old role
            let ole_index = roles.findIndex(item => item.id === user.role_id);
            let old_record = roles.find(item => item.id === user.role_id);
            if(old_record && old_record['users']) {
                let old_users = old_record.users;
                let filter_users = old_users.filter(item => item.id !== user.id);
                roles[ole_index] = {...old_record, users: [...filter_users]};
            }
            return {...state, roles: [...roles]};
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default:
            return state;
    }
}
