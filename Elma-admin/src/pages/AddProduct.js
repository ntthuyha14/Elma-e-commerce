import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
const AddProduct = () => {
    const [value, setValue] = useState('')

    const handleChangeDescription = (content, delta, source, editor) => {
        setValue(content)
        console.log(content)
    }

    // upload image
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ])
    const handleCancel = () => setPreviewOpen(false)
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        )
    }
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    )
    return (
        <div>
            <h3 className="mb-4 title">Add product</h3>
            <form action="" method="post">
                <CustomInput type="text" label="Enter product name" />
                <ReactQuill
                    className="mt-4"
                    theme="snow"
                    value={value}
                    onChange={handleChangeDescription}
                />
                <CustomInput type="number" label="Enter product price" />

                <select className="form-control py-3 mb-3 mt-3" name="" id="">
                    <option value="">Select brand</option>
                </select>
                <select className="form-control py-3 mb-3 mt-3" name="" id="">
                    <option value="">Select category</option>
                </select>
                <CustomInput type="number" label="Enter product quantity" />
                <>
                    <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </>
                <button
                    type="submit"
                    className="border-0 rounded-3 btn btn-success mt-3"
                >
                    Add product
                </button>
            </form>
        </div>
    )
}

export default AddProduct
