import {
    GET_PRODUCT_ITEM, SET_PAGINATION,
    SET_TABLE_LOADING, MOUTED
} from '../Dispatch/type';

export const initialState = {
    product_item: {
        seller: {
            store: {
                name: '',
                brand_logo: '',
                user_follow_stores: [],
            }
        },
        category: {
            id: 0,
            title: '',
        },
        similar_products: [],
        products_additional_image_link: [],
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

export const ProductDetailReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type) {
        case GET_PRODUCT_ITEM:
            if(
                payload &&
                payload.seller &&
                payload.seller.store
            ) return {...state, product_item: {...payload}};
            return state;
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
