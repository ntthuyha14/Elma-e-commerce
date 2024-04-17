/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Button, Space, Table, Tag, Tooltip } from 'antd'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { formattedNumber } from '../redux/appService'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

const Productlist = () => {
    const products = useSelector((state) => state.data.products)
    const columns = [
        {
            title: 'Main image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <div style={{ display: 'flex' }}>
                    <img
                        key={image}
                        src={image}
                        alt="Product Image"
                        style={{ width: 50, height: 50, marginRight: 5 }}
                    />
                </div>
            ),
        },
        {
            title: 'Images',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <div style={{ display: 'flex' }}>
                    {images.map((image) => (
                        <img
                            key={image}
                            src={image}
                            alt="Product Image"
                            style={{ width: 50, height: 50, marginRight: 5 }}
                        />
                    ))}
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <Link
                    className="textwrap2line"
                    style={{ textDecoration: 'none', width: 200 }}
                    to={'/'}
                >
                    <Tooltip title={text}>{text.slice(0, 70)}...</Tooltip>
                </Link>
            ),
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'quantity',
            render: (tags) => {
                if (tags < 10) {
                    return <Tag color="red">Hết hàng</Tag>
                } else if (tags < 30) {
                    return <Tag color="red"> Sắp Hết hàng</Tag>
                } else {
                    return <Tag color="green">Còn hàng</Tag>
                }
            },
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category) => <span>{category.name}</span>,
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
                <Tooltip title={text}>{text.slice(0, 50)}...</Tooltip>
            ),
        },

        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => formattedNumber(price),
        },
        {
            title: 'Number review',
            dataIndex: 'numberReviews',
            key: 'numberReviews',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => {
                return (
                    <>
                        <FaStar color="yellow" /> {rating}
                    </>
                )
            },
        },

        {
            title: 'Edit',
            dataIndex: '_id',
            key: '_id',
            render: (id, record) => (
                <Space size="middle">
                    <Button
                        onClick={() => {
                            console.log(id)
                        }}
                    >
                        <FaRegEdit />
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Delete',
            dataIndex: '_id',
            key: '_id',
            render: (id, record) => (
                <Space size="middle">
                    <Button onClick={() => console.log(id)}>
                        <MdDeleteOutline />
                    </Button>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <Table
                columns={columns}
                dataSource={products}
                scroll={{ x: 'unset' }} // Remove horizontal scrollbar
                onRow={(record, rowIndex) => ({
                    style: {
                        whiteSpace: 'nowrap', // Prevent text wrapping within cells
                    },
                })}
            />
            ;
        </div>
    )
}

export default Productlist
