import { Button, Table, notification } from 'antd'
import { FaRegCopy } from 'react-icons/fa6'
import React from 'react'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Customer = () => {
    const users = useSelector((state) => state.data.users)
    const [api, contextHolder] = notification.useNotification()
    const openNotification = (placement) => {
        api.success({
            message: 'Copy user id success!',
            placement,
        })
    }
    const columns = [
        // {
        //     title: 'Avatar',
        //     dataIndex: 'avatar',
        //     key: 'avatar',
        // },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'street',
            key: 'street',
        },
        {
            title: 'Id',
            dataIndex: 'id',
            render: (id) => (
                <div className="d-flex center align-items-center">
                    <span>{id}</span>
                    {contextHolder}
                    <CopyToClipboard text={id}>
                        <Button
                            style={{ marginLeft: 6 }}
                            onClick={() => openNotification('top')}
                        >
                            <FaRegCopy />
                        </Button>
                    </CopyToClipboard>
                </div>
            ),
        },
    ]

    return (
        <div>
            <h3 className="mb-4 title">Customer</h3>
            <Table dataSource={users} columns={columns} />
        </div>
    )
}

export default Customer
