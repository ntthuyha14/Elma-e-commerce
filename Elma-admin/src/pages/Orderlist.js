import React, {  useState } from 'react'
import {
    Avatar,
    Button,
    Card,
    List,
    Row,
    Select,
    Space,
    Table,
    Tag,
    notification,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { formattedDate, formattedNumber } from '../redux/appService'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'
import { updateOrder } from '../redux/thunk'

const Orderlist = () => {
    const orders = useSelector((state) => state.data.orders)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // state for order status
    const [orderStatus, setOrderStatus] = useState(
        orders.reduce((acc, order) => {
            acc[order._id] = order.status
            return acc
        }, {}),
    )

    const handleChangeStatus = (orderId, newStatus) => {
        setOrderStatus((prevStatus) => ({
            ...prevStatus,
            [orderId]: newStatus,
        }))
    }

    const [expandedRowKey, setExpandedRowKey] = useState(null)

    const handleExpand = (record) => {
        const newExpandedRowKey = record.key
        setExpandedRowKey(newExpandedRowKey)
    }

    // notify
    const [api, contextHolder] = notification.useNotification()
    const openNotification = (placement, id) => {
        api.success({
            message: `Update order ${id} status success!`,
            placement,
        })
    }

    const columns = [
        {
            title: 'Date ordered',
            dataIndex: 'dateOrdered',
            key: 'dateOrdered',
            render: (date) => <span>{formattedDate(date)}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'user',
            key: 'user',
            render: (user) => (
                <>
                    <Link to={'#user'}>{user?.name}</Link>
                </>
            ),
        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (total) => formattedNumber(total),
        },
        {
            title: 'Status',
            dataIndex: '_id',
            key: 'status',
            render: (id) => (
                <Select
                    value={orderStatus[id]}
                    style={{ width: 160 }}
                    onChange={(newStatus) => handleChangeStatus(id, newStatus)}
                    options={[
                        {
                            value: 'Pending',
                            label: <Tag color="green">{'Pending'}</Tag>,
                        },
                        {
                            value: 'Processing Order',
                            label: (
                                <Tag color="orange">{'Processing Order'}</Tag>
                            ),
                        },
                        {
                            value: 'Package order',
                            label: <Tag color="yellow">{'Package order'}</Tag>,
                        },
                        {
                            value: 'Shipped Order',
                            label: <Tag color="blue">{'Shipped Order'}</Tag>,
                        },
                        {
                            value: 'Delivered Order',
                            label: <Tag color="blue">{'Delivered Order'}</Tag>,
                        },

                        {
                            value: 'Cancelled Order',
                            label: <Tag color="red">{'Cancelled Order'}</Tag>,
                        },
                    ]}
                />
            ),
        },
        {
            title: 'Address',
            dataIndex: 'shippingAddress2',
            key: 'shippingAddress2',
            render: (shippingAddress2) => <span>{shippingAddress2}</span>,
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (id) => (
                <Space size="middle">
                    <Button
                        onClick={() => {
                            navigate(`/admin/orderdetail?id=${id}`)
                        }}
                    >
                        <FaRegEdit />
                    </Button>
                    {contextHolder}
                    <Button
                        onClick={() => {
                            const status = {
                                status: orderStatus[id],
                            }
                            dispatch(updateOrder(id, status))
                            openNotification('bottomLeft', id)
                        }}
                    >
                        <FaRegSave />
                    </Button>
                </Space>
            ),
        },
    ]
    return (
        <div className="">
            <h3 className="mb-2 title">Orders list</h3>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) =>
                        expandedRowKey === record.key && (
                            <Card>
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-2 title">
                                        Orders details: {record.id}
                                    </h6>
                                    <h6 className=" green mb-2">
                                        Total price:{' '}
                                        {formattedNumber(record.totalPrice)}
                                    </h6>
                                </div>
                                <div className="d-flex">
                                    <h7 className="mb-2 title">Note: </h7>
                                    <span style={{ marginTop: -1 }}>
                                        {record.note}
                                    </span>
                                </div>
                                <Card type="inner" title="Products">
                                    <List
                                        dataSource={record.orderItems}
                                        renderItem={(item) => (
                                            <List.Item key={item._id}>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar
                                                            size={'large'}
                                                            src={
                                                                item.product
                                                                    .image
                                                            }
                                                        />
                                                    }
                                                    title={
                                                        <span>
                                                            {`${item.product.name} - ${item.product.brand}`}
                                                        </span>
                                                    }
                                                    description={
                                                        item.quantity > 1
                                                            ? item.quantity +
                                                              ' items'
                                                            : item.quantity +
                                                              ' item'
                                                    }
                                                />
                                                <div>
                                                    {formattedNumber(
                                                        item.product.price,
                                                    )}
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                                <Card
                                    type="inner"
                                    style={{ margin: '16px 0' }}
                                    title="Shiping option"
                                >
                                    <Row className="d-flex align-items-center">
                                        <Avatar
                                            style={{ width: 'fit-content' }}
                                            size={'large'}
                                            src={record.shipping.image}
                                        />
                                        <div className="d-flex justify-content-between">
                                            <h7>
                                                {`${record.shipping.brand}`}
                                            </h7>
                                            <span>
                                                {record.shipping.time_express}
                                            </span>
                                        </div>
                                    </Row>
                                </Card>
                                <Card
                                    type="inner"
                                    style={{ margin: '16px 0' }}
                                    title=" Payment method"
                                ></Card>
                            </Card>
                        ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                    onExpand: handleExpand,
                }}
                dataSource={orders}
            />
        </div>
    )
}

export default Orderlist
