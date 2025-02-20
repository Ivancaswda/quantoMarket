import React, {useContext, useState} from 'react'
import InputMask from "react-input-mask";
import './placeOrder.css'
import {useNavigate} from "react-router-dom";
import LazyLoad from "react-lazyload";
import {ShopContext} from "../context/ShopContext.jsx";
import axios from "axios";
import {toast} from "react-toastify";


const PlaceOrder = () => {
    const [method, setMethod] = useState('cod')
    const [viaDebit, setViaDebit] = useState(false)
    const [payMethod, setPayMethod] = useState('')
    const navigate = useNavigate()
    const {backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext)

    const [formData, setFormData] = useState({
        // updating it whenever input changes
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        region: '',
        zipcode: '',
        country: '',
        phone: '',

    })

    const onChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        // updating this object with empty properties

        setFormData(data => ({...data, [name]:value}))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product  => product._id === items))
                        if (itemInfo) {
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            console.log(orderItems)

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            switch (method) {
                // api calls for Cash later
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;
                default:
                    break;

            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
            {/*---------------------------------- Левая Сторона ---------------------- */}
            <div className='flex flex-col gap-4 w-full items-center  '>
                <h1 className={'font-semibold text-3xl mb-4'}>Способ оплаты</h1>
                <div className='flex flex-col gap-4 items-center'>
                    <div>
                        <button type='button' onClick={() => {

                            setPayMethod('sber')
                        }}
                                className={`${payMethod === 'sber' ? 'bg-green-500 ' : ''}  px-6 py-2 bg-black text-white font-semibold flex items-center gap-2 rounded-lg`}>
                            При помощи
                            <LazyLoad>


                                <img width='70px'
                                     src="https://ilyapavlyuk.ru/wp-content/uploads/2023/06/sber_logo_white.png"
                                     alt=""/>
                            </LazyLoad>
                            Pay
                        </button>
                    </div>
                    <div>
                        <button type='button' onClick={() => {

                            setPayMethod('tbank')
                        }}
                                className={`${payMethod === 'tbank' ? 'bg-green-500' : 'tinkoff'}      px-6 py-2   text-white font-semibold flex items-center gap-2 rounded-lg`}
                        >
                            При помощи
                            <LazyLoad>

                                <img style={{borderRadius: '5px'}} width='25px'
                                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8gGDBFLQ4t6bHotQd_m3Ne09oBCRTJkwOiA&s"
                                     alt=""/>

                            </LazyLoad>
                            T-Pay
                        </button>
                    </div>
                    <div>
                        <button type='button' onClick={() => {



                            if (!viaDebit) {
                                setViaDebit(true)
                            } else {
                                setViaDebit(false)
                            }

                            setPayMethod('debit')


                        }}
                                className={`bg-orange-${!viaDebit  ? '50' : ''}0  font-semibold px-6 py-2 bg-gray-100 rounded-lg flex items-center gap-2 ${viaDebit ? 'text-black': 'text-white'} `}>
                            {!viaDebit ? 'При помощи банковской карты' : "Убрать бланку"}

                            { !viaDebit ?(<svg width='25px' xmlns="http://www.w3.org/2000/svg"
                                               viewBox="0 0 576 512">
                                <path fill="white"
                                      d="M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"/>
                            </svg>) : (
                                <svg width='22px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 384 512">
                                    <path fill='red'
                                          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                {viaDebit ? (


                    <div className='flex flex-col  '>
                        <div className='flex flex-col gap-2 mb-3 '>
                            <h1 className='text-center text-2xl font-semibold flex items-center gap-2 justify-center'>Заполните
                                информацию
                                <svg width='25px' height='25px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <path
                                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                </svg>
                            </h1>
                            <div className='flex items-center gap-2  mt-4'>
                                <input   onChange={onChangeHandler} name='firstName' value={formData.firstName} placeholder='Введите ваше имя' required={true}
                                         className='rounded-lg py-2 px-2' type="text"/>
                                <input  onChange={onChangeHandler} name='lastName' value={formData.lastName} placeholder='Введите вашу фамилию' required={true}
                                        className='rounded-lg py-2 px-2'
                                        type="text"/>
                            </div>
                            <div className='mt-4'>
                                {/*  <InputMask mask="9999 9999 9999 9999"
                                           maskChar={null}
                                           placeholder="Номер карты"
                                           className='input-mask border border-zinc-300 rounded-lg w-full p-2 mt-1'

                                           required={true}


                                >

                                    {(inputProps) => <input {...inputProps} />}

                                </InputMask> */}
                                <input placeholder='Введите ваш email адрес'  required={true} type="email" onChange={onChangeHandler}
                                       className='border border-blue-300 rounded-lg py-2 px-2'
                                       name='email' value={formData.email}/>
                                <input placeholder='Введите вашу улицу' required={true} type="text" onChange={onChangeHandler}
                                       className='border border-blue-300 rounded-lg py-2 px-2'
                                       name='street' value={formData.street}/>

                            </div>
                            <div className='flex items-center gap-2  '>

                                {/*     <InputMask mask="99/99"
                                               maskChar={null}
                                               placeholder="Срок годности карты"
                                               className='border border-zinc-300 rounded-lg w-full p-2 mt-1'
                                               required={true}


                                    >

                                        {(inputProps) => <input {...inputProps} />}

                                    </InputMask> */}
                                <input placeholder='Введите ваш город' required={true} type="text" name='city' onChange={onChangeHandler} value={formData.city}
                                       className='border border-blue-300 rounded-lg py-2 px-2'/>
                                <input placeholder='Введите ваш регион' required={true} type="text" name='region' onChange={onChangeHandler} value={formData.region}
                                       className='border border-blue-300 rounded-lg py-2 px-2'/>

                                <input placeholder='Введите ваш индекс' required={true} type="text" name='zipcode' onChange={onChangeHandler} value={formData.zipcode}
                                       className='border border-blue-300 rounded-lg py-2 px-2'/>
                                <input placeholder='Введите вашу страну' required={true} type="text" name='country' onChange={onChangeHandler} value={formData.country}
                                       className='border border-blue-300 rounded-lg py-2 px-2'/>

                                <input  placeholder='Введите ваш номер телефона' required={true} type="number" name='phone' onChange={onChangeHandler} value={formData.phone}
                                        className='border border-blue-300 rounded-lg py-2 px-2'/>
                            </div>

                        </div>

                        <button type='submit'
                                className={` ${payMethod === 'debit' ? 'bg-green-500 text-white' : 'bg-white-500 text-black'} flex gap-2 px-1 py-3 font-medium items-center justify-center text-lg    border  rounded-2xl`}
                        >
                            <svg width='30px' xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 576 512">
                                <path fill="#0761a6"
                                      d="M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"/>
                            </svg>
                            Купить Сейчас
                        </button>
                    </div>
                ) : null}

            </div>
        </form>
    )
}
export default PlaceOrder
