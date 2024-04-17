import {
    ADMIN_INFO,
    SET_CATEGORIES,
    SET_ORDER,
    SET_PRODUCTS,
    SET_USER,
    UPDATE_ORDER,
} from './types'

// GET ALL CATEGORIES
export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories,
})

// GET ALL PRODUCTS
export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
})

// GET ALL USERS
export const setUsers = (users) => ({
    type: SET_USER,
    payload: users,
})

// GET ALL ORDERS
export const setOrders = (orders) => ({
    type: SET_ORDER,
    payload: orders,
})

// GET ALL ORDERS
export const updateOrder = (order) => ({
    type: UPDATE_ORDER,
    payload: order,
})

// GET ADMIN INFO
export const getAdminInfo = (info) => ({
    type: ADMIN_INFO,
    payload: info,
})
