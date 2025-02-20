import React, { useEffect, useState} from 'react'

import axios from "axios";
import {backendUrl} from "../App.jsx";
import {assets} from "../assets/admin_assets/assets.js";
import {toast} from "react-toastify";

const Orders = ({token}) => {
    // getting all orders data from backend to frontend
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    // creating function to change stage of order in frontend
    const statusHandler = async (event, orderId) => {
        try {
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/order/status', {orderId, status:event.target.value}, {headers: {token}})
            // getting right stage of delivery to update from backend
            if (response.data.success) {
                await fetchAllOrders() // rebooting the order
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
            toast.success('Стадия заказа изменена')
        }
    }


    const fetchAllOrders = async () => {
        if (!token) {
            return null
        }
        try {
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/order/list', {}, {headers: {token}})
            console.log(response.data)
            setOrders(response.data.orders) // geting all orders into this array
        } catch (error) {
                console.log(error)
        } finally {
            setLoading(false)
        }

    }
    const removeOrder = async (orderId) => {
        try {
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/order/remove', {orderId}, {headers: {token}})
            // getting right stage of delivery to update from backend
            if (response.data.success) {
                await fetchAllOrders() // rebooting the order
                toast.success('Заказ удален')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchAllOrders()

    }, [token]);
    if (orders.length <= 0) {
        return <div className='w-100 h-100 text-center'>
            <svg className='mr-auto ml-auto mt-6 mb-6' width='40' height='40' xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
                <path fill='blue'
                      d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
            </svg>
            <p className='text-blue-700 font-semibold'>У вас пока еще нет заказов!</p>
        </div>
    }

    return (
        <div>
            <h3>Страница заказов</h3>
            {loading ? (<div className='grid place-items-center min-h-[80vh]'>
                <div
                    className='w-12 h-12 place-self-center border-4 border-gray-400 border-t-blue-700 rounded-full animate-spin '>

                </div>
            </div>) : (
                <div>
                    {
                        orders.reverse().map((order, index) => (
                            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_1.5fr_0.5fr_2fr] lg:grid-cols-[0.5fr_1.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2
                        border-blue-100 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                                <svg width='40' height='40' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512">
                                    <path fill='blue'
                                          d="M50.7 58.5L0 160l208 0 0-128L93.7 32C75.5 32 58.9 42.3 50.7 58.5zM240 160l208 0L397.3 58.5C389.1 42.3 372.5 32 354.3 32L240 32l0 128zm208 32L0 192 0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-224z"/>
                                </svg>
                                <div>


                                    <div>
                                        {order.items.map((item, index) => {
                                            if (index === order.items.length - 1) { // getting last product in order
                                                return (
                                                    <p className='py-0.5' key={index}>{item.name.slice(0, 10)}...
                                                        x {item.quantity}
                                                        <span></span></p>
                                                )
                                            } else {
                                                return (
                                                    <p key={index}>{item.name} x {item.quantity}
                                                        <span></span></p>
                                                )
                                            }
                                        })}
                                    </div>
                                    <p className='mt-3 font-medium mb-2 text-blue-700 flex items-center gap-1 '>
                                        <svg width='14' height='14' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 448 512">
                                            <path fill='blue'
                                                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                                        </svg>
                                        {order.address.name ? order.address.name : 'Не указано' + " " + order.address.surname ? order.address.surname : 'Не указано'}
                                    </p>
                                    <div>
                                        <p className='flex items-center gap-1'>
                                            <svg width='14' height='14' xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 576 512">
                                                <path
                                                    d="M256 32l-74.8 0c-27.1 0-51.3 17.1-60.3 42.6L3.1 407.2C1.1 413 0 419.2 0 425.4C0 455.5 24.5 480 54.6 480L256 480l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 64 201.4 0c30.2 0 54.6-24.5 54.6-54.6c0-6.2-1.1-12.4-3.1-18.2L455.1 74.6C446 49.1 421.9 32 394.8 32L320 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64zm64 192l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32z"/>
                                            </svg>
                                            {order.address.street ? order.address.street : 'Не указано' + ','}</p>
                                        <p className='flex items-center gap-1'>
                                            <svg width='14' height='14' xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 576 512">
                                                <path
                                                    d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                                            </svg>
                                            {order.address.home ? order.address.home : 'Не указано' + ','}</p>
                                        <p className='flex items-center gap-1'>
                                            <svg width='14' height='14' xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 640 512">
                                                <path
                                                    d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 89.9 0c-6.3-10.2-9.9-22.2-9.9-35.1c0-46.9 25.8-87.8 64-109.2l0-95.9L384 48c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM576 272a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM352 477.1c0 19.3 15.6 34.9 34.9 34.9l218.2 0c19.3 0 34.9-15.6 34.9-34.9c0-51.4-41.7-93.1-93.1-93.1l-101.8 0c-51.4 0-93.1 41.7-93.1 93.1z"/>
                                            </svg>
                                            {order.address.flat ? order.address.flat : 'Не указано'}</p>
                                        <p className='flex items-center gap-1'>
                                            <svg width='14' height='14' xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 640 512">
                                                <path
                                                    d="M640 0l0 400c0 61.9-50.1 112-112 112c-61 0-110.5-48.7-112-109.3L48.4 502.9c-17.1 4.6-34.6-5.4-39.3-22.5s5.4-34.6 22.5-39.3L352 353.8 352 64c0-35.3 28.7-64 64-64L640 0zM576 400a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM23.1 207.7c-4.6-17.1 5.6-34.6 22.6-39.2l46.4-12.4 20.7 77.3c2.3 8.5 11.1 13.6 19.6 11.3l30.9-8.3c8.5-2.3 13.6-11.1 11.3-19.6l-20.7-77.3 46.4-12.4c17.1-4.6 34.6 5.6 39.2 22.6l41.4 154.5c4.6 17.1-5.6 34.6-22.6 39.2L103.7 384.9c-17.1 4.6-34.6-5.6-39.2-22.6L23.1 207.7z"/>
                                            </svg>
                                            {order.address.wayOfDelivery ? order.address.wayOfDelivery : 'Не указано'}
                                        </p>


                                    </div>
                                    <p className='flex items-center gap-1'>
                                        <svg width='14' height='14' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 512">
                                            <path
                                                d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                                        </svg>
                                        +{order.address.phone ? order.address.phone : 'Не указано'}</p>

                                </div>
                                <div>

                                    <p className='mt-3 '>Способ оплаты : <span
                                        className='text-blue-700'>{order.paymentMethod === 'COD' ? 'При выдачи' : ''}</span>
                                    </p>
                                    <p>Оплата : <span
                                        className='text-blue-700'>{order.payment ? 'Оплачено' : 'Ожидается'}</span></p>
                                    <p>Дата : <span
                                        className='text-blue-700'>{new Date(order.date).toLocaleDateString()}</span>
                                    </p> {/* displaying data */}
                                </div>
                                <p className='text-sm sm:text-[15px]'>{order.amount}р</p> {/* displaying price */}
                                {/* возможность админу выбирать на каком уровень заказа */}
                                <select onChange={(event) => {
                                    statusHandler(event, order._id) // providing choice and id of selected order
                                }} value={order.status} className='p-2 font-semibold'>
                                    <option value="Заказ сделан">Заказ сделан</option>
                                    <option value="Заказ подтверждён">Заказ подтверждён</option>
                                    <option value="Заказ ожидает тебя">Заказ ожидает тебя</option>
                                </select>
                                <img className='cursor-pointer w-30 mt-auto mb-auto ml-auto mr-auto' onClick={() => {
                                    removeOrder(order._id)
                                }} src={assets.cancel_icon} alt=""/>
                            </div>

                        ))
                    }
                </div>
            )}

        </div>
    )
}
export default Orders
