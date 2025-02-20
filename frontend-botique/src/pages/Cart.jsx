import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from "../context/ShopContext.jsx";
import {Link} from "react-router-dom";
import CartTotal from "../components/CartTotal/CartTotal.jsx";

import InputMask from "react-input-mask";
import {AuthContext} from "../context/AuthContext.jsx";
import {toast} from "react-toastify";
import './Cart.css'
import LazyLoad from "react-lazyload";
import axios from "axios";
const Cart = () => {
    const [delOption, setDelOption] = useState(null)
    const {products, currency, cartItems, updateQuantity, navigate, getCartAmount, delivery_fee, setCartItems, backendUrl} = useContext(ShopContext)
    const {phoneNumber , setPhoneNumber, email, setEmail, globalUser} = useContext(AuthContext)
    const [cartData, setCartData] = useState([])
    const [adress, setAdress] = useState(null)
    const {token} = useContext(ShopContext)
    const [wayToDeliver, setWayToDeliver] = useState('')
    useEffect(() => {

        if (products.length > 0) {
            const tempData = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item] // get quantity of current product
                        })
                    }
                }
            }
            setCartData(tempData)
        }




    }, [cartItems, products])

    // Состояния для отображения текста и редактируемого поля
    const [isBlurred, setIsBlurred] = useState(true);
    const [isEmailBlurred, setIsEmailBlurred] = useState(true);
    const [isAdressBlurred, setIsAdressBlurred] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdressEditing, setIsAdressEditing] = useState(false);
    const [isEmailEditing, setIsEmailEditing] = useState(false);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [isNameBlurred, setIsNameBlurred] = useState(true)
    const [isSurnameEditing, setIsSurnameEditing] = useState(false)
    const [isSurnameBlurred, setIsSurnameBlurred] = useState(true)
    const [isAddressEditing, setIsAddressEditing] = useState(false)
    const [isAddressBlurred, setIsAddressBlurred] = useState(true)
    const [isStreetEditing, setIsStreetEditing] = useState(false)
    const [isStreetBlurred, setIsStreetBlurred] = useState(true)
    const [isHomeEditing, setIsHomeEditing] = useState(false)
    const [isHomeBlurred, setIsHomeBlurred] = useState(true)
    const [isFlatEditing, setIsFlatEditing] = useState(false)
    const [isFlatBlurred, setIsFlatBlurred] = useState(true)
    const [method, setMethod] = useState('cod')
    const [text, setText] = useState("Это редактируемый текст");
    const [editableEmail, setEditableEmail] = useState(email) // Локальное состояние для редактирования
    // Обработчики событий
    const handleTextClick = () => {
        if (!isEditing) {
            setIsBlurred(false); // Убираем размытие при клике
        }
    };
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        street: '',
        home: '',
        flat: '',
        phone: ''
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
            if (!formData.name || !formData.email || !formData.surname || !formData.phone || !formData.street || !formData.flat) {
                toast.warn('Заполните необходимые данные для получания заказа!')
                window.scrollTo(0,-20)
                return;
            }
            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                wayToDeliver: wayToDeliver
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

        }    catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }




    useEffect(() => {
        // Чтение email из localStorage при загрузке компонента
        const storedEmail = JSON.parse(localStorage.getItem('newEmail'));
        if (storedEmail) {
            setEmail(storedEmail);

        }
    }, [editableEmail]);

    useEffect(() => {
        // Чтение email из localStorage при загрузке компонента
        const storedAddress = JSON.parse(localStorage.getItem('newAddress'));
        if (storedAddress) {
            setAdress(storedAddress);

        }
    }, []);
    useEffect(() => {
        // Чтение email из localStorage при загрузке компонента
        const storedPhone = JSON.parse(localStorage.getItem('newPhone'));
        if (storedPhone) {
            setAdress(storedPhone);

        }
    }, []);
    const [conciseDesc, setConciseDesc] = useState(true)
        const [vibrate, setVibrate] = useState(false)
  //  localStorage.setItem('newAddress', JSON.stringify(e.target.value))
    const cleanedEmail = email.replace(/['"]+/g, '');

    const handlePlaceOrder = () => {
        if (!token) {
            toast.error('У вас должен быть аккаунт перед тем как делать заказ!');
            return;
        }




    };
    return (

        <form onSubmit={onSubmitHandler} className='border-t pt-14 '>
            <div className='text-2xl mb-3'>
                <h1 className='flex items-center gap-2 p-4 font-semibold'   >Ваша корзина <svg width='20px' height='20px' xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 576 512">
                    <path fill='#0b5aee'
                        d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                </svg></h1>
            </div>

            {cartData.length > 0 ? (
                <div>
                    <div className='w-100 flex  items-start'>
                        <div className='flex flex-col items-start w-100 '>


                    {
                        cartData.map((item, index) => {


                            const productData = products.find((product) => { // find specific product which in cart
                                return product._id === item._id
                            })

                            return (
                                <div
                                    style={{width: '85%'}}
                                    className='py-4 mb-6 border-t border-b bg-gray-100 p-4 rounded-2xl  text-gray-700 grid  items-center gap-4'
                                key={index}>
                                <div className='flex items-start gap-6 w-full'>
                                    <LazyLoad>

                                    <img src={productData.image[0]} className='w-24  sm:w-22' alt=""/>

                                    </LazyLoad>
                                    <div className='w-100'>
                                        <div className='flex justify-between items-center '>
                                            <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                            <div className='flex items-center gap-6'>
                                                <button type='button' onClick={() => {
                                                    updateQuantity(item._id, item.size,  item.quantity - 1)
                                                }} className='p-2 bg-gray-200 cursor-pointer'>
                                                    <svg className='w-3' xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 448 512">
                                                        <path
                                                            d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                                    </svg>
                                                </button>
                                                <p>{item.quantity}</p>
                                                <button type='button' onClick={() => {


                                                    updateQuantity(item._id,  item.size ,  item.quantity + 1)
                                                }} className='p-2 bg-gray-200 cursor-pointer'>
                                                    <svg className='w-3' xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 448 512">
                                                        <path
                                                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className='flex items-center'>
                                                <div className='p-2  text-blue-700 font-semibold text-lg rounded-lg'>
                                                    <b>{productData.price}{currency}</b>
                                                </div>
                                                <strike>{(productData.price * 1.105).toFixed(0)}{currency}</strike>
                                            </div>

                                        </div>

                                        <div className='flex flex-col items-start justify-start gap-5 mt-2 '>


                                            <p title='Нажмите чтобы увеличить/уменьшить кол-во символов' className='cursor-pointer' onClick={() => {
                                                setConciseDesc(!conciseDesc)

                                            }}>{conciseDesc ? productData.description.slice(0, 18) + '...' : productData.description}</p>
                                            <div className='w-full flex items-center justify-start gap-5'>

                                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-bookmark-heart-fill cursor-pointer"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                                                </svg>


                                                <svg className='cursor-pointer' onClick={() => {
                                                    updateQuantity(item._id, item.size,  0) // to remove this product we provide zero
                                                }} width='15px' xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 448 512">
                                                    <path fill='grey'
                                                          d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                                </svg>
                                                <div className='flex items-start w-full'>
                                                    <p className='text-gray-500 font-semibold'>{item.retOption}</p>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* SUBTOTAL PRICE IN CART */}

                            </div>
                        )
                    })
                }
                </div>
                <div className='flex justify-end bg-gray-100 p-6 rounded-2xl '>
                    <div className='w-full sm:w-[300px]'>
                        <CartTotal/>
                        <div className='w-full text-center flex items-center justify-center mt-4'>


                                <button onClick={handlePlaceOrder} className='bg-blue-700 text-white text-lg px-16 py-2 rounded-lg'>Перейти к
                                    оплате
                                </button>

                        </div>
                    </div>

                </div>


                    </div>

                        <div className=' p-4 ' style={{width: '70%'}}>


                            { token ? null: (
                                     <div  className='flex items-center  mb-8'>
                                         <div className='flex items-center gap-2'>
                                             <h1 className='text-lg font-semibold'>Что бы продолжить  у вас должен быть <span className='text-blue-700'>аккаунт</span></h1>
                                             <button onClick={() => {
                                                 navigate('/login')
                                             }} className='px-3 py-2 bg-blue-700 text-white rounded-lg font-semibold'>
                                                    Создать аккаунт
                                             </button>
                                         </div>
                                     </div>
                                        )}
                            <div className='bg-gray-100 p-4  ' style={{width: '85%'}}>

                                <div className='flex mb-4 '>
                                    <h1 className='text-2xl text-left font-semibold'>Ваши данные</h1>
                                </div>
                                <div className='flex  flex-col gap-2  background'>
                                    <div
                                        className={` p-3 rounded-2xl text-gray-100 font-semibold  bg-blue-600 flex items-center gap-2`}>
                                        <svg width='15px' height='15px' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 512">
                                            <path fill='white'
                                                  d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                                        </svg>
                                        <h1>Email:</h1>
                                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                            {/* Текст либо размыт, либо редактируется */}
                                            {!isEmailEditing ? (
                                                <span
                                                    onClick={() => {
                                                        if (!isEmailEditing) {
                                                            setIsEmailBlurred(false); // Убираем размытие при клике
                                                        }
                                                    }}
                                                    style={{
                                                        filter: isEmailBlurred ? "blur(5px)" : "none",
                                                        cursor: isEmailBlurred ? "pointer" : "default",
                                                        transition: "filter 0.3s ease",
                                                    }}
                                                >
                  {cleanedEmail ? cleanedEmail : 'Введите ваш email!'}
            </span>
                                            ) : (
                                                <input required={true} name='email' value={formData.email} onChange={onChangeHandler}
                                                       className='border border-zinc-300 rounded w-full p-1 text-sm mt-1 text-gray-700'
                                                       type='email'/>
                                            )}

                                            {/* Кнопка редактирования */}
                                            <button type='button'
                                                    onClick={() => {
                                                        if (isEmailEditing) {
                                                            toast("Email был успешно изменен!", {
                                                                autoClose: 2000, // Уведомление исчезает через 2 секунды
                                                                style: {backgroundColor: "darkgreen", color: 'white'}, // Оранжевый цвет фона
                                                            });
                                                            setIsEmailEditing(false)
                                                        } else {
                                                            setIsEmailEditing(true)
                                                        }
                                                    }}
                                                    style={{
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        fontSize: "16px",
                                                    }}
                                                    title="Редактировать"
                                            >
                                                ✏️
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className={`  p-3 rounded-2xl text-gray-100 font-semibold  bg-blue-600 flex items-center gap-2`}>
                                        <svg width='15px' height='15px' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 448 512">
                                            <path fill='white'
                                                  d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/>
                                        </svg>

                                        <h1>Телефон:</h1>
                                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                            {/* Текст либо размыт, либо редактируется */}
                                            {!isAdressEditing ? (
                                                <span
                                                    onClick={() => {
                                                        if (!isAdressEditing) {
                                                            setIsAdressBlurred(false); // Убираем размытие при клике
                                                        }
                                                    }}
                                                    style={{
                                                        filter: isAdressBlurred ? "blur(5px)" : "none",
                                                        cursor: isAdressBlurred ? "pointer" : "default",
                                                        transition: "filter 0.3s ease",
                                                    }}
                                                >
                  {cleanedEmail ? cleanedEmail : 'Введите ваш номер телефона!'}
            </span>
                                            ) : (
                                                <input required={true} name='phone' value={formData.phone}
                                                       onChange={onChangeHandler}
                                                       className='border border-zinc-300 rounded w-full p-1 text-sm mt-1 text-gray-700'
                                                       type='number'/>
                                            )}

                                            {/* Кнопка редактирования */}
                                            <button type='button'
                                                    onClick={() => {
                                                        if (isAdressEditing) {
                                                            toast("Adress был успешно изменен!", {
                                                                autoClose: 2000, // Уведомление исчезает через 2 секунды
                                                                style: {backgroundColor: "darkgreen", color: 'white'}, // Оранжевый цвет фона
                                                            });
                                                            setIsAdressEditing(false)
                                                        } else {
                                                            setIsAdressEditing(true)
                                                        }
                                                    }}
                                                    style={{
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        fontSize: "16px",
                                                    }}
                                                    title="Редактировать"
                                            >
                                                ✏️
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className={`  p-3 rounded-2xl text-sm text-gray-100 font-semibold  bg-blue-600 flex items-center gap-2`}>

                                        <svg width='15px' height='15px' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 384 512">
                                            <path fill='white'
                                                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                                        </svg>
                                        <h1>Имя:</h1>
                                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                            {/* Текст либо размыт, либо редактируется */}
                                            {!isNameEditing ? (
                                                <span
                                                    onClick={() => {
                                                        if (!isNameEditing) {
                                                            setIsNameBlurred(false); // Убираем размытие при клике
                                                        }
                                                    }}
                                                    style={{
                                                        filter: isNameBlurred ? "blur(5px)" : "none",
                                                        cursor: isNameBlurred ? "pointer" : "default",
                                                        transition: "filter 0.3s ease",
                                                    }}
                                                >
                  {cleanedEmail ? cleanedEmail : 'Введите ваше имя!'}
            </span>
                                            ) : (
                                                <input required={true} name='name' value={formData.name} onChange={onChangeHandler}
                                                       className='border border-zinc-300 rounded w-full p-1 text-sm mt-1 text-gray-700'
                                                       type='text'/>
                                            )}

                                            {/* Кнопка редактирования */}
                                            <button type='button'
                                                    onClick={() => {
                                                        if (isNameEditing) {
                                                            toast("Email был успешно изменен!", {
                                                                autoClose: 2000, // Уведомление исчезает через 2 секунды
                                                                style: {backgroundColor: "darkgreen", color: 'white'}, // Оранжевый цвет фона
                                                            });
                                                            setIsNameEditing(false)
                                                        } else {
                                                            setIsNameEditing(true)
                                                        }
                                                    }}
                                                    style={{
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        fontSize: "16px",
                                                    }}
                                                    title="Редактировать"
                                            >
                                                ✏️
                                            </button>
                                        </div>


                                    </div>
                                    <div
                                        className={`  p-3 rounded-2xl text-gray-100 font-semibold  bg-blue-600 flex items-center gap-2`}>
                                        <svg width='15px' height='15px' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 448 512">
                                            <path fill='white'
                                                  d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/>
                                        </svg>

                                        <h1>Фамилия:</h1>
                                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                            {/* Текст либо размыт, либо редактируется */}
                                            {!isSurnameEditing ? (
                                                <span
                                                    onClick={() => {
                                                        if (!isSurnameEditing) {
                                                            setIsSurnameBlurred(false); // Убираем размытие при клике
                                                        }
                                                    }}
                                                    style={{
                                                        filter: isSurnameBlurred ? "blur(5px)" : "none",
                                                        cursor: isSurnameBlurred ? "pointer" : "default",
                                                        transition: "filter 0.3s ease",
                                                    }}
                                                >
                  {cleanedEmail ? cleanedEmail : 'Введите вашу фамилию!'}
            </span>
                                            ) : (
                                                <input required={true} name='surname' value={formData.surname}
                                                       onChange={onChangeHandler}
                                                       className='border border-zinc-300 rounded w-full p-1 text-sm mt-1 text-gray-700'
                                                       type='text'/>
                                            )}

                                            {/* Кнопка редактирования */}
                                            <button type='button'
                                                    onClick={() => {
                                                        if (isSurnameEditing) {
                                                            toast("Email был успешно изменен!", {
                                                                autoClose: 2000, // Уведомление исчезает через 2 секунды
                                                                style: {backgroundColor: "darkgreen", color: 'white'}, // Оранжевый цвет фона
                                                            });
                                                            setIsSurnameEditing(false)
                                                        } else {
                                                            setIsSurnameEditing(true)
                                                        }
                                                    }}
                                                    style={{
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        fontSize: "16px",
                                                    }}
                                                    title="Редактировать"
                                            >
                                                ✏️
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className={`  p-3 rounded-2xl text-gray-100 font-semibold  bg-blue-600 flex items-center gap-2`}>
                                        <svg width='15px' height='15px' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 448 512">
                                            <path fill='white'
                                                  d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/>
                                        </svg>

                                        <h1>Улица:</h1>
                                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                            {/* Текст либо размыт, либо редактируется */}
                                            {!isStreetEditing ? (
                                                <span
                                                    onClick={() => {
                                                        if (!isStreetEditing) {
                                                            setIsStreetBlurred(false); // Убираем размытие при клике
                                                        }
                                                    }}
                                                    style={{
                                                        filter: isStreetBlurred ? "blur(5px)" : "none",
                                                        cursor: isStreetBlurred ? "pointer" : "default",
                                                        transition: "filter 0.3s ease",
                                                    }}
                                                >
                  {cleanedEmail ? cleanedEmail : 'Введите вашу улицу!'}
            </span>
                                            ) : (
                                                <input required={true} name='street' value={formData.street}
                                                       onChange={onChangeHandler}
                                                       className='border border-zinc-300 rounded w-full p-1 text-sm mt-1 text-gray-700'
                                                       type='text'/>
                                            )}

                                            {/* Кнопка редактирования */}
                                            <button type='button'
                                                    onClick={() => {
                                                        if (isStreetEditing) {
                                                            toast("Улица была успешно изменена!", {
                                                                autoClose: 2000, // Уведомление исчезает через 2 секунды
                                                                style: {backgroundColor: "darkgreen", color: 'white'}, // Оранжевый цвет фона
                                                            });
                                                            setIsStreetEditing(false)
                                                        } else {
                                                            setIsStreetEditing(true)
                                                        }
                                                    }}
                                                    style={{
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        fontSize: "16px",
                                                    }}
                                                    title="Редактировать"
                                            >
                                                ✏️
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className={`  p-3 rounded-2xl text-gray-100 font-semibold  bg-blue-600 flex items-center gap-2`}>
                                        <svg width='15px' height='15px' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 448 512">
                                            <path fill='white'
                                                  d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/>
                                        </svg>

                                        <h1>Дом:</h1>
                                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                            {/* Текст либо размыт, либо редактируется */}
                                            {!isHomeEditing ? (
                                                <span
                                                    onClick={() => {
                                                        if (!isHomeEditing) {
                                                            setIsHomeBlurred(false); // Убираем размытие при клике
                                                        }
                                                    }}
                                                    style={{
                                                        filter: isHomeBlurred ? "blur(5px)" : "none",
                                                        cursor: isHomeBlurred ? "pointer" : "default",
                                                        transition: "filter 0.3s ease",
                                                    }}
                                                >
                  {cleanedEmail ? cleanedEmail : 'Введите номер вашего дома!'}
            </span>
                                            ) : (
                                                <input required={true} name='home' value={formData.home}
                                                       onChange={onChangeHandler}
                                                       className='border border-zinc-300 rounded w-full p-1 text-sm mt-1 text-gray-700'
                                                       type='text'/>
                                            )}

                                            {/* Кнопка редактирования */}
                                            <button type='button'
                                                    onClick={() => {
                                                        if (isHomeEditing) {
                                                            toast("Adress был успешно изменен!", {
                                                                autoClose: 2000, // Уведомление исчезает через 2 секунды
                                                                style: {backgroundColor: "darkgreen", color: 'white'}, // Оранжевый цвет фона
                                                            });
                                                            setIsHomeEditing(false)
                                                        } else {
                                                            setIsHomeEditing(true)
                                                        }
                                                    }}
                                                    style={{
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        fontSize: "16px",
                                                    }}
                                                    title="Редактировать"
                                            >
                                                ✏️
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className={`  p-3 rounded-2xl text-gray-100 font-semibold  bg-blue-600 flex items-center gap-2`}>
                                        <svg width='15px' height='15px' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 448 512">
                                            <path fill='white'
                                                  d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/>
                                        </svg>

                                        <h1>Квартира:</h1>
                                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                            {/* Текст либо размыт, либо редактируется */}
                                            {!isFlatEditing ? (
                                                <span
                                                    onClick={() => {
                                                        if (!isFlatEditing) {
                                                            setIsFlatBlurred(false); // Убираем размытие при клике
                                                        }
                                                    }}
                                                    style={{
                                                        filter: isFlatBlurred ? "blur(5px)" : "none",
                                                        cursor: isFlatBlurred ? "pointer" : "default",
                                                        transition: "filter 0.3s ease",
                                                    }}
                                                >
                  {cleanedEmail ? cleanedEmail : 'Введите номер вашей квартиры!'}
            </span>
                                            ) : (
                                                <input required={true} name='flat' value={formData.flat}
                                                       onChange={onChangeHandler}
                                                       className='border border-zinc-300 rounded w-full p-1 text-sm mt-1 text-gray-700'
                                                       type='number'/>
                                            )}

                                            {/* Кнопка редактирования */}
                                            <button type='button'
                                                    onClick={() => {
                                                        if (isFlatEditing) {
                                                            toast("Adress был успешно изменен!", {
                                                                autoClose: 2000, // Уведомление исчезает через 2 секунды
                                                                style: {backgroundColor: "darkgreen", color: 'white'}, // Оранжевый цвет фона
                                                            });
                                                            setIsFlatEditing(false)
                                                        } else {
                                                            setIsFlatEditing(true)
                                                        }
                                                    }}
                                                    style={{
                                                        border: "none",
                                                        background: "none",
                                                        cursor: "pointer",
                                                        fontSize: "16px",
                                                    }}
                                                    title="Редактировать"
                                            >
                                                ✏️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>



                </div>

            ) : (
                <div style={{height: '50vh'}} className='w-100 flex items-start justify-center text-center '>
                    <div className='flex flex-col gap-6 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="#1d4dd6"
                             className="bi bi-cart-x" viewBox="0 0 16 16">
                            <path
                                d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
                            <path
                                d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                        </svg>
                        <div className={'flex flex-col gap-2'}>
                            <h1 className='text-3xl font-semibold'>В корзине пока пусто</h1>
                            <p className='text-1xl'>Загляните на главную, чтобы выбрать товары или найдите нужное в
                                поиске</p>
                        </div>
                        <Link to='/'>
                            <button className='px-4 py-2 bg-blue-700 text-white rounded-lg'>Перейти на главную</button>
                        </Link>
                    </div>
                </div>
            )}


        </form>

    )
}
export default Cart
