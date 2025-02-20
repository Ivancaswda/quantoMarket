import React, {useContext, useEffect, useState} from 'react'
import {Link, NavLink, useParams} from "react-router-dom";
import {ShopContext} from "../context/ShopContext.jsx";

import './Product.css'
import ProductItem from "../components/ProductItem/ProductItem.jsx";
import InputMask from "react-input-mask";
import {useNavigate} from "react-router-dom";
import LazyLoad from "react-lazyload";
import Reviews from "../components/Reviews.jsx";
import AddReview from "../components/AddReview.jsx";

const Product = () => {
    const {productId} = useParams() // get product id from link string
    console.log(productId)
    const navigate = useNavigate()
    const {products, currency, addToCart, retOption, setRetOption, proceedBtn, setProceedBtn } = useContext(ShopContext)
    const [image, setImage] = useState('')
    const [productData, setProductData] = useState(false)
    const [size, setSize] = useState('')
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([])

    const fetchProductData = async () => {
        const product = products.find((item) => item._id === productId);
        if (product) {
            setProductData(product);
            setImage(product.image[0]);
        }
    };

    useEffect(() => {
        fetchProductData()
    }, [productId])
    useEffect(() => { // автоматически перемещает нас вверх страницы каждый раз когда мы на нее заходим
        window.scrollTo(0,0)
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()

            productsCopy = productsCopy.filter((item) => { // get filtered product by category
                return productData.category === item.category

            })
            productsCopy = productsCopy.filter((item) => { // get filtered product by subCategory
                return productData.subCategory === item.subCategory
            })
         setRelatedProducts(productsCopy)
        }
    }, [products])
    console.log(relatedProducts)
    const {handleReviewAdded, reviews} = useContext(ShopContext)


    return productData ? (
        <div className='border-t-2 pt-20 pb-20 transition-opacity ease-in duration-500 opacity-100 '>
            {/* displaying of product images */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

                {/* Product Images */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-x-auto justify-between sm:justify-normal sm:w-[11.7%] w-full'>
                        {
                            productData.image.map((item, index) => (
                                <LazyLoad key={index}>


                                <img onClick={() => {
                                    setImage(item)
                                }} src={item}  className='w-[24%] sm:w-full sm:mb-3  rounded-lg flex-shrink-0 cursor-pointer' alt=""/>
                                </LazyLoad>
                            ))
                        }
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <LazyLoad>

                        <img  src={image} className=' rounded-lg w-full h-auto' alt=""/>

                        </LazyLoad>
                    </div>
                </div>


                {/* ----------------Product intel----------- */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <svg width='10px' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill="#0145bc"
                                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                        <svg width='10px' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill="#0145bc"
                                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                        <svg width='10px' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill="#0145bc"
                                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                        <svg width='10px' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill="#0145bc"
                                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                        <svg width='10px' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill="#0145bc"
                                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                        <p className='pl-2'>()</p>
                    </div>
                    <p className='mt-2 text-3xl font-medium'>{productData.price}{currency}</p>
                    <h1 className='text-blue-700 mt-2 text-sm font-semibold'>Описание:</h1>
                    <p className=' text-gray-600 text-sm font-medium w-80'>{productData.description} </p>


                    <div className='flex flex-col gap-4 my-8'>


                        <div
                            className={`flex items-start ${selectedPayment === 'card' ? 'flex-col' : 'items-center'}   gap-5 mt-4 justify-start`}>

                            {selectedPayment === 'sber' ? (
                                <a className="no-underline hover:no-underline"
                                   href="https://www.sberbank.com/promo/sberpay">
                                    <button
                                        className='text-white flex gap-2 px-3 py-3 font-medium items-center   border  rounded-2xl'
                                        style={{background: '#000000',}}>
                                        <LazyLoad>

                                            <img width='70px'
                                                 src="https://ilyapavlyuk.ru/wp-content/uploads/2023/06/sber_logo_white.png"
                                                 alt=""/>

                                        </LazyLoad>
                                        Купить Сейчас
                                    </button>
                                </a>
                            ) : selectedPayment === 'tbank' ? (
                                <a className="no-underline hover:no-underline" style={{underline: 'none'}}
                                   href="https://www.tbank.ru/mybank/payments/">
                                    <button
                                        className='text-white flex gap-2 px-3 py-3 font-medium no-underline hover:no-underline    border  rounded-2xl'
                                        style={{background: '#303030',}}>
                                        <LazyLoad>
                                            <img style={{borderRadius: '5px'}} width='25px'
                                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8gGDBFLQ4t6bHotQd_m3Ne09oBCRTJkwOiA&s"
                                                 alt=""/>
                                        </LazyLoad>
                                        Купить Сейчас
                                    </button>
                                </a>

                            ) : selectedPayment === 'card' ? (
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
                                            <input placeholder='Введите ваш email' required={true}
                                                   className='rounded-lg py-2 px-2' type="email"/>
                                            <input placeholder='Введите ваше ФИО' required={true}
                                                   className='rounded-lg py-2 px-2'
                                                   type="text"/>

                                        </div>
                                        <div className='mt-4'>
                                            <InputMask mask="9999 9999 9999 9999"
                                                       maskChar={null}
                                                       placeholder="Номер карты"
                                                       className='input-mask border border-zinc-300 rounded-lg w-full p-2 mt-1'

                                                       required={true}


                                            >

                                                {(inputProps) => <input {...inputProps} />}

                                            </InputMask>
                                        </div>
                                        <div className='flex items-center gap-2  '>
                                            <InputMask mask="99/99"
                                                       maskChar={null}
                                                       placeholder="Срок годности карты"
                                                       className='border border-zinc-300 rounded-lg w-full p-2 mt-1'
                                                       required={true}


                                            >

                                                {(inputProps) => <input {...inputProps} />}

                                            </InputMask>
                                            <InputMask mask="999"
                                                       maskChar={null}
                                                       placeholder="CVV"
                                                       className='border border-zinc-300 rounded-lg w-full p-2 mt-1'
                                                       required={true}


                                            >

                                                {(inputProps) => <input {...inputProps} />}

                                            </InputMask>
                                        </div>

                                    </div>

                                    <button
                                        className='flex gap-2 px-3 py-3 font-medium items-center    border  rounded-2xl'
                                        style={{background: '#ffffff',}}>
                                        <svg width='30px' xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 576 512">
                                            <path fill="#0761a6"
                                                  d="M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"/>
                                        </svg>
                                        Купить Сейчас
                                    </button>
                                </div>
                            ) : null
                            }

                            {!proceedBtn ? (<button
                                    onClick={() => {
                                        setProceedBtn(true); // Блокируем кнопку после клика
                                        addToCart(productData._id, size);
                                        setTimeout(() => setProceedBtn(false), 1000); // Разблокировка через 1 секунду
                                    }}
                                    disabled={proceedBtn} // Блокируем повторный клик


                                    className='text-white flex items-center gap-2 text-lg  font-medium text-sm  border-n  rounded-2xl'
                                    style={{
                                        background: 'rgb(3, 50, 160)',
                                        paddingBottom: '14px',
                                        paddingTop: '14px',
                                        paddingLeft: '20px',
                                        paddingRight: '20px'
                                    }}>
                                    <svg width='20px' xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 576 512">
                                        <path fill='white'
                                              d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192 32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512L430 512c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32l-85.6 0L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192l-232.6 0L253.3 35.1zM192 304l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm128 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                    </svg>
                                    Добавить в корзину
                                </button>
                            ) : (
                                <button onClick={() => {

                                    navigate('/cart')


                                }}
                                        className='text-blue-800 flex items-center gap-2 text-lg   font-medium text-sm  border-n  rounded-2xl'
                                        style={{
                                            background: 'rgb(112,153,255)',
                                            paddingBottom: '14px',
                                            paddingTop: '14px',
                                            paddingLeft: '20px',
                                            paddingRight: '20px'
                                        }}>
                                    <svg width='20px' xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 576 512">
                                        <path fill='white'
                                              d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192 32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512L430 512c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32l-85.6 0L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192l-232.6 0L253.3 35.1zM192 304l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm128 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                    </svg>
                                    Перейти в корзину
                                </button>
                            )}

                        </div>

                    </div>

                    <hr className='mt-3 sm:w-4/5'/>
                    <div className='text-sm text-gray-500 flex flex-col gap-1'>
                        <p>100% Оригинальный продукт.</p>
                        <p>Быстрая доставка!</p>
                        <p>Бесплатный возврат в течении 7 дней.</p>

                    </div>
                </div>
            </div>

            {/* -----------Description & Review Section------------*/}
            <div className='mt-20 '>
                <div className='flex justify-between items-center'>
                    <b className='border px-5 py-3 text-sm'>Описание</b>
                    <b className='border px-5 py-3 text-sm '>Оставить отзыв о продукте</b>

                </div>
                <div className='flex justify-between gap-4 border px-6 py-5 text-sm text-gray-500'>

                    <div>
                        <p>{productData.description}</p>

                    </div>
                    <div>
                        <AddReview productId={productData._id} onReviewAdded={handleReviewAdded}/>

                    </div>

                </div>
                <Reviews productId={productData._id} reviews={reviews}/>
            </div>
            {/*----------related Products----------- */}

            <div className='my-24'>
                <div className='text-center text-3xl py-16'>
                    <b>Похожие товары</b>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 gap-y-6'>
                    {relatedProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name}
                                     price={item.price} bestseller={item.bestseller}/>
                    ))}
                </div>
            </div>

        </div>
    ) : (<div className=' text-center flex flex-col justify-center items-center mt-[200px] mb-[200px] ' >
        <svg width='40' height='40' xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512">
            <path fill='blue'
                d="M369.8 37.4c14.7 9.8 18.7 29.7 8.9 44.4L337.1 144l62.9 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-105.5 0-64 96L400 304c17.7 0 32 14.3 32 32s-14.3 32-32 32l-212.2 0-65.2 97.7c-9.8 14.7-29.7 18.7-44.4 8.9s-18.7-29.7-8.9-44.4L110.9 368 48 368c-17.7 0-32-14.3-32-32s14.3-32 32-32l105.5 0 64-96L48 208c-17.7 0-32-14.3-32-32s14.3-32 32-32l212.2 0 65.2-97.7c9.8-14.7 29.7-18.7 44.4-8.9z"/>
        </svg>
        <p className={'text-2xl mt-12'}>Мы не можем найти этот продукт</p>
    </div>)
}
export default Product
