import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import { Card, Col, Divider, Image, Row, message } from 'antd'
import queryString from 'query-string'
import { useSelector } from 'react-redux'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { storage } from '../firebase'
import { API } from '../redux/config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { fetchCategories } from '../redux/thunk'

const Category = () => {
    const navigate = useNavigate()
    const id = queryString.parse(window.location.search)
    const categories = useSelector((state) => state.data.categories)
    const category = categories.filter((item) => item._id === id.id)[0]
    const timestamp = Date.now()
    const [categoryName, setCategoryName] = useState(
        category ? category.name : null,
    )

    const [imageUpload, setImageUpload] = useState(null)
    const [iconUpload, setIconUpload] = useState(null)

    const [icon, setIcon] = useState(null)
    const [image, setImage] = useState(null)
    const categoryUpdate = {
        name: categoryName,
        icon: iconUpload,
        image: imageUpload,
    }
    const uploadFile = async () => {
        if (image) {
            const imageRef = ref(
                storage,
                `category/images/${image.name}${timestamp}`,
            )
            await uploadBytes(imageRef, image)
            const imageDownloadURL = await getDownloadURL(imageRef)
            categoryUpdate.image = imageDownloadURL
            await setImageUpload(imageDownloadURL)
        }
        if (icon) {
            const iconRef = ref(
                storage,
                `category/icons${icon.name}${timestamp}`,
            )
            await uploadBytes(iconRef, icon)
            const iconDownloadURL = await getDownloadURL(iconRef)
            categoryUpdate.icon = iconDownloadURL
            await setIconUpload(iconDownloadURL)
        }
        try {
            const res = await axios.put(
                `${API}categories/${id}`,
                categoryUpdate,
            )
            console.log(res.data)
            fetchCategories()
            message.success('Update category succcess!')
            setTimeout(() => {
                navigate('/admin/categorylist')
            }, 1000)
        } catch (error) {
            if ('Cannot convert object to primitive value' === error.message) {
                fetchCategories()
                message.success('Update category succcess!')
                setTimeout(() => {
                    navigate('/admin/categorylist')
                }, 1000)
            } else {
                console.log(error)
            }
        }
    }
    return (
        <div>
            {id.id ? (
                <Card>
                    <h3 className="mb-4 title">Update category</h3>
                    <CustomInput
                        value={category.name}
                        type="text"
                        label="Enter category name"
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <Card className="mt-2">
                        <div className=" d-flex flex-row justify-content-around">
                            <div className="d-flex flex-column align-items-center">
                                <h5 className="mb-4 title">Category icon</h5>

                                {iconUpload != null ? (
                                    <Image
                                        className="mb-3"
                                        src={iconUpload}
                                        alt="Category icon"
                                        width={150}
                                    />
                                ) : (
                                    <Image
                                        className="mb-3"
                                        src={category.icon}
                                        alt="Category icon"
                                        width={150}
                                    />
                                )}

                                <input
                                    prefix={<IoCloudUploadOutline />}
                                    type="file"
                                    onChange={(event) => {
                                        setIcon(event.target.files[0])
                                    }}
                                />
                            </div>
                            <Divider style={{ height: 200 }} type="vertical" />
                            <div className="d-flex flex-column align-items-center">
                                <h5 className="mb-4 title">Category image</h5>
                                {imageUpload != null ? (
                                    <Image
                                        className="mb-3"
                                        src={imageUpload}
                                        alt="Category icon"
                                        width={150}
                                    />
                                ) : (
                                    <Image
                                        className="mb-3"
                                        src={category.image}
                                        alt="Category icon"
                                        width={150}
                                    />
                                )}
                                <input
                                    prefix={<IoCloudUploadOutline />}
                                    type="file"
                                    onChange={(event) => {
                                        setImage(event.target.files[0])
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                    <button
                        onClick={() => uploadFile()}
                        className="border-0 rounded-3 btn btn-success mt-3"
                    >
                        Update category
                    </button>
                </Card>
            ) : (
                <>
                    <h3 className="mb-4 title">Add category</h3>
                    <CustomInput type="text" label="Enter category name" />
                    <Row>
                        <Col>
                            <h5 className="mb-4 title">Category icon</h5>
                            <Image alt="Category icon" width={200} />
                        </Col>
                        <Divider type="vertical" />
                        <Col>
                            <h5 className="mb-4 title">Category image</h5>
                            <Image alt="Category image" width={200} />
                        </Col>
                    </Row>
                    <button className="border-0 rounded-3 btn btn-success mt-3">
                        Add category
                    </button>
                </>
            )}
        </div>
    )
}

export default Category
