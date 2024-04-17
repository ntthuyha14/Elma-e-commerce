import React from 'react'
import { HiOutlineArrowUpRight } from 'react-icons/hi2' //HiOutlineArrowDownRight
// import { Column } from '@ant-design/plots'
import Orderlist from './Orderlist'
import { useSelector } from 'react-redux'
import { formattedNumber } from '../redux/appService'
// import { Line } from '@ant-design/charts'

const Dashboard = () => {
    const date = new Date()
    const year = date.getFullYear() - 1
    const month = date.toLocaleDateString('us-US', { month: 'long' })
    const userNumbers = useSelector((state) => state.data.users).length
    const orderNumbers = useSelector((state) => state.data.orders).length
    const orders = useSelector((state) => state.data.orders)
    const total = orders.reduce((total, item) => {
        if (item.status === 'Delivered Order') total += item.totalPrice
        return total
    }, 0)
    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p className="mb-0">Orders</p>
                        <h4 style={{ fontSize: 'xxx-large', marginBottom: -8 }}>
                            {orderNumbers}
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green">
                            <HiOutlineArrowUpRight />
                            32%
                        </h6>
                        <p className="mb-0">{`Compared to ${month} ${year}`}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p className="mb-0">Users</p>
                        <h4 style={{ fontSize: 'xxx-large', marginBottom: -8 }}>
                            {userNumbers}
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green">
                            <HiOutlineArrowUpRight />
                            32%
                        </h6>
                        <p className="mb-0">{`Compared to ${month} ${year}`}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p className="mb-0">Total</p>
                        <h4
                            className="green"
                            style={{ fontSize: 'xxx-large', marginBottom: -8 }}
                        >
                            {formattedNumber(total)}
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green">
                            <HiOutlineArrowUpRight />
                            32%
                        </h6>
                        <p className="mb-0">{`Compared to ${month} ${year}`}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-4 title">Income Statics</h3>
                <p>Show chart here!</p>
            </div>
            <div className="mt-4">
                <Orderlist />
            </div>
        </div>
    )
}

export default Dashboard
