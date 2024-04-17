import {
    ADMIN_INFO,
    SET_CATEGORIES,
    SET_ORDER,
    SET_PRODUCTS,
    SET_USER,
    UPDATE_ORDER,
} from '../actions/types'

const initialState = {
    categories: [],
    products: [],
    users: [],
    orders: [],
    order: [],
    admin: [],
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES: {
            return { ...state, categories: action.payload }
        }
        case SET_PRODUCTS:
            return { ...state, products: action.payload }
        case SET_ORDER:
            return { ...state, orders: action.payload }
        case SET_USER:
            return { ...state, users: action.payload }
        case UPDATE_ORDER:
            return { ...state, order: action.payload }
        case ADMIN_INFO:
            return { ...state, admin: action.payload }

        default:
            return state
    }
}
