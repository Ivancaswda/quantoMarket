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
    const [isBlocked, setIsBlocked] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchGeolocation = async () => {

            try {
                setLoading(true)
                const response = await fetch('https://ipapi.co/json/') // api discover ip of user
                const data = await response.json()
                // returns contries
                if (data.country !== 'RU' ) {
                    setIsBlocked(true)
                }

            } catch (error) {
                return (
                    <div>
                        Не удалось зайти на сайт
                    </div>
                )
            } finally {
                setLoading(false)
            }
        }

        fetchGeolocation()
    }, [])







  return isBlocked ? (<div className='h-[100vh] w-100 mb-20'>
      <div id='id'>
          <div style={{position: 'absolute', zIndex: '100',}}
               className='w-full h-80 text-center flex flex-col items-center justify-center '>
              <img className='w-20 rounded-full'
                   src='https://pic.rutubelist.ru/user/c7/4a/c74af2bde05d669270019bc350a4252c.jpg' alt=""/>
              <h1 className='font-semibold text-3xl mt-10 text-gray-200 '>К сожалению на данный момент <span
                  className='text-blue-600'>quantShop</span> недоступен в вашем текущем <span
                  className='text-green-400'>регионе</span></h1>
          </div>
          <div id='inject'>

          </div>

      </div>
      <svg id='animate' className='absolute mr-[62%] ml-[50%]' width='34' height='34'
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 384 512">
          <path fill='black'
                d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
      </svg>
      <div className='flex items-center justify-center flex-col gap-10 mt-[100px] mb-20'>

          <h1 className='text-2xl '>Почему так?</h1>
          <div className='  flex justify-center gap-10  '>
              <div
                  className='border border-blue-500  flex-col items-center justify-center flex gap-4 px-4 py-6 rounded-lg duration-200 cursor-pointer transition-all hover:scale-105'
              >
                  <svg width='30' height='30' xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 512 512">
                      <path
                          d="M448 160l-128 0 0-32 128 0 0 32zM48 64C21.5 64 0 85.5 0 112l0 64c0 26.5 21.5 48 48 48l416 0c26.5 0 48-21.5 48-48l0-64c0-26.5-21.5-48-48-48L48 64zM448 352l0 32-256 0 0-32 256 0zM48 288c-26.5 0-48 21.5-48 48l0 64c0 26.5 21.5 48 48 48l416 0c26.5 0 48-21.5 48-48l0-64c0-26.5-21.5-48-48-48L48 288z"/>
                  </svg>
                  <p>Мы не можем выполнять свои функции</p>
              </div>
              <div
                  className='border border-blue-500 flex-col items-center justify-center flex gap-4 px-4 py-6 rounded-lg duration-200 cursor-pointer transition-all hover:scale-105'
              >
                  <svg width='30' height='30' xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 640 512">
                      <path
                          d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-54.8-43L576 224l-64 0 0 152L384 275.7l0-51.7-64 0 0 1.5L277.2 192l325.9 0c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0L121.7 0c-16 0-31 8-39.9 21.4L74.1 32.8 38.8 5.1zM36.8 192l85 0L21 112.5 6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM320 384l-192 0 0-160-64 0 0 160 0 80c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-65.5-64-50.4 0 35.9z"/>
                  </svg>
                  <p>У нас нету магазинов в вашем регионе</p>
              </div>
              <div
                  className='border border-blue-500 flex-col items-center justify-center flex gap-4 px-4 py-6 rounded-lg duration-200 cursor-pointer transition-all hover:scale-105'
              >
                  <svg width='30' height='30' xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512">
                      <path
                          d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zM272 192l224 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16l224 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16zM164 152l0 13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9l0 13.8c0 11-9 20-20 20s-20-9-20-20l0-14.6c-10.3-2.2-20-5.5-28.2-8.4c0 0 0 0 0 0s0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5l0-14c0-11 9-20 20-20s20 9 20 20z"/>
                  </svg>
                  <p>Мы не сможем получать оплату</p>
              </div>
          </div>
      </div>
      <div className='w-full flex items-center gap-10 justify-center'>
          <div>
              <hr/>
              <p className='text-sm text-center'>Copyright &copy; 2026 by <b>QuantoMarket</b> Все права защищены
              </p>
          </div>
          <div className='flex justify-center gap-10'>
              <svg width='30' height='30' xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 576 512">
                  <path fill='black'
                        d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/>
              </svg>
              <svg width='30' height='30' xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 448 512">
                  <path fill='black'
                        d="M31.5 63.5C0 95 0 145.7 0 247V265C0 366.3 0 417 31.5 448.5C63 480 113.7 480 215 480H233C334.3 480 385 480 416.5 448.5C448 417 448 366.3 448 265V247C448 145.7 448 95 416.5 63.5C385 32 334.3 32 233 32H215C113.7 32 63 32 31.5 63.5zM75.6 168.3H126.7C128.4 253.8 166.1 290 196 297.4V168.3H244.2V242C273.7 238.8 304.6 205.2 315.1 168.3H363.3C359.3 187.4 351.5 205.6 340.2 221.6C328.9 237.6 314.5 251.1 297.7 261.2C316.4 270.5 332.9 283.6 346.1 299.8C359.4 315.9 369 334.6 374.5 354.7H321.4C316.6 337.3 306.6 321.6 292.9 309.8C279.1 297.9 262.2 290.4 244.2 288.1V354.7H238.4C136.3 354.7 78 284.7 75.6 168.3z"/>
              </svg>
              <svg width='30' height='30' xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 496 512">
                  <path fill='black'
                      d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/>
              </svg>
          </div>
      </div>
  </div>) : (
      <div className='min-h-screen bg-gray-50'>
          <ToastContainer/>
          {token === '' ? <Login setToken={setToken}/> : (
              <>
                  <Navbar setToken={setToken}/>
                  <hr/>

                  <div className='flex w-full'>
                      {location.pathname !== '/' && (
                          <Sidebar/>
                      )}
                      <div
                          className={`  ${location.pathname !== '/' && 'w-[70%] mx-auto ml-[max(5vw, 25px)] my-8'}  text-gray-600 text-base`}>
                          <Routes>
                              <Route path='/' element={<MainPage/>}/>
                              <Route path='/add-product' element={<AddProduct token={token}/>}/>
                              <Route path='/list-product' element={<ListProduct token={token}/>}/>
                              <Route path='/orders' element={<Orders token={token}/>}/>
                              <Route path='/reviews' element={<Reviews token={token}/>}/>
                          </Routes>
                      </div>
                  </div>
              </>
          )}
      </div>
  )
}

export default App
