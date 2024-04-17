import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Stepper } from 'react-form-stepper'
import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
const AddBlog = () => {
    const [value, setValue] = useState('')

    const handleChange = (content, delta, source, editor) => {
        setValue(content)
        console.log(content)
    }

    const { Dragger } = Upload

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file
            if (status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files)
        },
    }

    return (
        <div>
            <h3 className="mb-4 title">Add blog</h3>
            <Stepper
                steps={[
                    { label: 'Add blog details' },
                    { label: 'Upload image' },
                    { label: 'Completely' },
                ]}
                activeStep={1}
            />
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                </p>
            </Dragger>
            <div className="">
                <form action="" method="post">
                    <CustomInput type="text" label="Enter Blog Title" />
                    <select
                        className="form-control py-3 mb-3 mt-3"
                        name=""
                        id=""
                    >
                        <option value="">Select blog category</option>
                    </select>
                </form>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="border-0 rounded-3 btn btn-success mt-3"
                >
                    Add blog
                </button>
            </div>
        </div>
    )
}

export default AddBlog
