import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Form, notification } from 'antd'
import axios from 'axios'
import { API } from '../redux/config'
import { getAdminInfo } from '../redux/actions/actions'
import { useEffect } from 'react'
import { fetchData } from '../redux/thunk'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    })
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)

    const [api, contextHolder] = notification.useNotification()
    const openNotification = (placement, message) => {
        api.info({
            message: message,
            placement,
        })
    }
    const openErrorNotification = (placement, message) => {
        api.error({
            message: message,
            placement,
        })
    }
    const openSuccessNotification = (placement, message) => {
        api.success({
            message: message,
            placement,
        })
    }
    const handleLogin = async () => {
        if (email === null && password === null) {
            openNotification('topRight', 'Please enter email and password!')
            return
        } else if (email === null)
            openNotification('topRight', 'Please enter email!')
        else if (password === null)
            openNotification('topRight', 'Please enter password!')
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
            openNotification('topRight', 'Invalid email format!')
        else {
            try {
                const res = await axios.post(`${API}users/signin`, {
                    email: email,
                    password_hash: password,
                })
                if (res.status === 200 && res.data.isAdmin === true) {
                    openSuccessNotification(
                        'topRight',
                        `Signin successful. Welcome ${res.data.name} to Elma admin 🤩
                    !`,
                    )
                    dispatch(getAdminInfo(res.data))
                    setTimeout(() => {
                        navigate('/admin')
                    }, 1500)
                } else {
                    openErrorNotification(
                        'topRight',
                        "You are not Elma's admin!",
                    )
                }
            } catch (error) {
                openErrorNotification('topRight', error.response.data)
            }
        }
    }
    return (
        <div className="py-5 indigo-bg" style={{ minHeight: '100vh' }}>
            {contextHolder}

            <br />
            <br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Login</h3>
                <p className="text-center">
                    Login to your account to continue.
                </p>
                <div className="error text-center"></div>
                <Form onSubmit={() => navigate('/admin')}>
                    <CustomInput
                        type="text"
                        label="Email"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div name="email" className="error mt-2"></div>
                    <CustomInput
                        type="password"
                        label="Password"
                        id="pass"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div name="password" className="error mt-2"></div>
                    <div className="mb-3 text-end">
                        <Link to="forgot-password" className="">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        onClick={handleLogin}
                        className="indigo-bg border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        type="submit"
                    >
                        Login
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default Login
