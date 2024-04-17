import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import React from 'react'
import Forgotpassword from './pages/Forgotpassword'
import Resetpassword from './pages/Resetpassword'
import Orderlist from './pages/Orderlist'
import Productlist from './pages/Productlist'
import AddProduct from './pages/AddProduct'
import Customer from './pages/Customer'
import Orderdetails from './pages/Orderdetails'
import Brand from './pages/Brand'
import Settings from './pages/Settings'
import Marketing from './pages/Marketing'
import Analytics from './pages/Analytics'
import Category from './pages/Category'
import Chat from './pages/Chat'
import Blog from './pages/Blog'
import AddBlog from './pages/AddBlog'
import AddBlogCategory from './pages/AddBlogCategory'
import { Provider } from 'react-redux'
import store from './redux/store'
import Categorylist from './pages/Categorylist'

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/forgot-password"
                        element={<Forgotpassword />}
                    />
                    <Route path="/reset-password" element={<Resetpassword />} />
                    <Route path="/admin" element={<MainLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="orderlist" element={<Orderlist />} />
                        <Route path="orderdetail" element={<Orderdetails />} />
                        <Route path="addproduct" element={<AddProduct />} />
                        <Route path="productlist" element={<Productlist />} />
                        <Route path="customers" element={<Customer />} />
                        <Route path="brand" element={<Brand />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="marketing" element={<Marketing />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="category" element={<Category />} />
                        <Route path="categorylist" element={<Categorylist />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="addblog" element={<AddBlog />} />
                        <Route
                            path="add-blog-category"
                            element={<AddBlogCategory />}
                        />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    )
}

export default App
