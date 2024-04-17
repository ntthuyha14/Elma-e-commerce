import { Button, Space, Table, notification } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegCopy } from 'react-icons/fa6'
import CopyToClipboard from 'react-copy-to-clipboard'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
const Categorylist = () => {
    const navigate = useNavigate()
    const categories = useSelector((state) => state.data.categories)
    const [api, contextHolder] = notification.useNotification()
    const openNotification = (placement) => {
        api.success({
            message: 'Copy success!',
            placement,
        })
    }
    const handleEditCategory = (id) => {
        navigate(`/admin/category/?id=${id}`)
    }

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            render: (img) => (
                <div>
                    <img alt="Category_image" src={img} width={50} />
                </div>
            ),
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            render: (img) => (
                <div>
                    <img alt="Category icon" src={img} width={50} />
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => b.name.localeCompare(a.name),
            sortDirections: ['descend', 'asc'],
        },
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name - b.name,
            sortDirections: ['descend'],
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (id) => (
                <Space>
                    {contextHolder}
                    <Button onClick={() => handleEditCategory(id)}>
                        <BiEdit />
                    </Button>
                    <CopyToClipboard text={id}>
                        <Button onClick={() => openNotification('top')}>
                            <FaRegCopy />
                        </Button>
                    </CopyToClipboard>
                </Space>
            ),
        },
    ]

    const onChange = (pagination, filters, sorter, extra) => {}
    return (
        <>
            <h3 className="mb-4 title">Category list</h3>

            <Table
                style={{ textAlign: 'center' }}
                columns={columns}
                dataSource={categories}
                onChange={onChange}
            />
        </>
    )
}

export default Categorylist
