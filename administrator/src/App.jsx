import {Route, Routes, useLocation} from "react-router-dom";
import AddProduct from "./pages/AddProduct.jsx";
import ListProduct from "./pages/ListProduct.jsx";
import Orders from "./pages/Orders.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import {useEffect, useState} from "react";
import Login from "./components/Login.jsx";
import { ToastContainer } from 'react-toastify';

import MainPage from "./pages/MainPage.jsx";
import Reviews from "./pages/Reviews.jsx";
export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {

     const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '' )
    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])
    const location = useLocation()
  return (
    <div className='min-h-screen bg-gray-50'>
        <ToastContainer/>
        {token === '' ? <Login setToken={setToken}/> : (
            <>
                <Navbar setToken={setToken} />
                <hr/>

                <div className='flex w-full' >
                    {location.pathname !== '/' && (
                        <Sidebar/>
                    )}
                    <div className={`  ${location.pathname !== '/' && 'w-[70%] mx-auto ml-[max(5vw, 25px)] my-8'}  text-gray-600 text-base`}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/add-product' element={<AddProduct token={token} />}/>
                            <Route path='/list-product' element={<ListProduct token={token} />}/>
                            <Route path='/orders' element={<Orders token={token} />}/>
                            <Route path='/reviews' element={<Reviews token={token} />}/>
                        </Routes>
                    </div>
                </div>
            </>
        )}
    </div>
  )
}

export default App
