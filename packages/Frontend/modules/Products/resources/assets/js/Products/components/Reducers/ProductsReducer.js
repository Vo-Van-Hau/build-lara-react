import {
    GET_PRODUCTS, SET_PAGINATION, GET_PRODUCT_CATEGORIES,
    SET_TABLE_LOADING, MOUTED, GET_PRODUCT_CATEGORY, GET_AREAS, GET_DISTRICTS, GET_WARDS,
} from '../Dispatch/type';

export const initialState = {
    products: [],
    product_categories: [],
    product_category: {},
    areas: {
        countries: {
            provinces: [],
            districts: [],
            wards: []
        }
    },
    filters: {
        stores: [],
        brands: [],
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
 * @author: <hauvo1709@gmail.com>
 * @todo
 * @param
 * @return {array}
 */
const getStoresFromProducts = (products) => {
    let stores = [];
    if(products) {
        products.forEach((item, index) => {
            if(item.seller) {
                if(item.seller.store) {
                    const { id, name } = item.seller.store;
                    if(!stores.map((store) => store.id).includes(id)) {
                        stores.push({
                            name: name,
                            id: id,
                        });
                    }
                }
            }
        });
    }
    return stores;
}

/**
 * @author: <hauvo1709@gmail.com>
 * @todo
 * @param
 * @return {array}
 */
 const getBrandsFromProducts = (products) => {
    let brands = [];
    if(products) {
        products.forEach((item, index) => {
            if(item.category) {
                if(item.category.product_category_brands) {
                    const data = item.category.product_category_brands;
                    data.forEach((_brands, index) => {
                        const { id, name, category_id } = _brands;
                        if(!brands.map((brand) => brand.id).includes(id)) {
                            brands.push({
                                name: name,
                                id: id,
                                category_id: category_id,
                            });
                        }
                    })
                }
            }
        });
    }
    return brands;
}

export const ProductsReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: [...payload],
                filters: {
                    ...state.filters,
                    stores: getStoresFromProducts(payload),
                    brands: getBrandsFromProducts(payload),
                }
            };
        case GET_PRODUCT_CATEGORIES:
            return {...state, product_categories: [...payload]};
        case GET_PRODUCT_CATEGORY:
            return {...state, product_category: {...payload}};
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
        case SET_PAGINATION:
            return {...state, pagination: { ...payload, showSizeChanger: false}};
        case SET_TABLE_LOADING:
            return {...state, loading_table: !state.loading_table};
        case MOUTED:
            return {...state, mouted: payload};
        default: return state;
    }
}
