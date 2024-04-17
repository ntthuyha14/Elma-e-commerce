import axios from 'axios'
import { API } from './config'
import {
    setCategories,
    setOrders,
    setProducts,
    setUsers,
} from './actions/actions'

export const fetchData = () => async (dispatch) => {
    try {
        const categories = await axios.get(`${API}categories`)
        const products = await axios.get(`${API}products`)
        const orders = await axios.get(`${API}orders`)
        const users = await axios.get(`${API}users`)
        dispatch(setCategories(categories.data))
        dispatch(setProducts(products.data))
        dispatch(setOrders(orders.data))
        dispatch(setUsers(users.data))
    } catch (error) {
        console.log('Error fetching data: ', error)
    }
}

export const fetchOrders = () => async (dispatch) => {
    try {
        const orders = await axios.get(`${API}orders`)
        dispatch(setOrders(orders.data))
    } catch (error) {
        console.log(error)
    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        const categories = await axios.get(`${API}categories`)
        dispatch(setCategories(categories.data))
    } catch (error) {
        console.log(error)
    }
}
export const updateOrder = (id, status) => async (dispatch) => {
    try {
        await axios.put(`${API}orders/${id}`, status)
        dispatch(fetchOrders())
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
