import {
    GET_GROUPS, SET_USER_GROUPS, SET_PAGINATION,
    SET_TABLE_LOADING, SET_FORM_LOADING, SET_DRAWER, MOUTED
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

export const GroupsReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_GROUPS:
            return { ...state, groups: [...payload] };

        // case SET_USER_GROUPS:
        //     let {id, users, user} = payload;
        //     let { Groups } = state;
        //     // // xử lý group select
        //     let index = Groups.findIndex(item => item.id === id);
        //     let record = Groups.find(item => item.id === id);
        //     Groups[index] = {...record, users:[...users]};
        //     // xử lý group cũ của user
        //     // let { groups } = user;
        //     // let group_id = groups[0] ? groups[0].id : null;
        //     // if(group_id){
        //     //     let indexCP = Groups.findIndex(item => item.id === group_id);
        //     //     let recordCP = Groups.find(item => item.id === group_id);
        //     //     let user_old = recordCP.users;
        //     //     let userCP = user_old.filter(item => item.id !== user.id);
        //     //     Groups[indexCP] = {...recordCP, users:[...userCP]};
        //     // }
        //     // xong
        //     return { ...state, Groups:[...Groups] };
        case SET_PAGINATION:
            return { ...state, pagination: { ...payload, showSizeChanger: false} };
        case SET_TABLE_LOADING:
            return { ...state, loading_table: !state.loading_table };
        // case SET_FORM_LOADING:
        //     return { ...state, loadingForm: !state.loadingForm };
        // case SET_DRAWER:
        //     return { ...state, visible: !state.visible };
        case MOUTED:
            return { ...state, mouted: payload };

        default: return state;
    }
}
