import React, {useContext} from 'react'
import {ShopContext} from "../../context/ShopContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import './ProductItem.css'
const ProductItem = ({id, image, name, price, bestseller}) => {

    const {currency, addToCart, productData, } = useContext(ShopContext)
    const navigate = useNavigate()
    const {handleReviewAdded, reviews} = useContext(ShopContext)
    return (
        <div className='text-gray-700 cursor-pointer flex flex-col  w-100 no-underline hover:no-underline

        '
              >
            <Link  className="hover:no-underline hover:text-current" to={`/product/${id}`}>


                <div className='overflow-hidden rounded-2xl '>
                    <img src={image} className='hover:scale-110 transition ease-in-out w-100 h-100  '  alt=""/>
                </div>

                <div className='pt-3 justify-between w-full flex-col flex  no-underline hover:no-underline'>
                    <div className='flex items-center justify-between'>


                        <b className='text-start pb-1 text-lg   text-gray-700'>{name}</b>

                    </div>
                    <div className='flex items-center w-full gap-2'>


                        <p className='text-lg font-bold '>{price}{currency}</p>
                        {bestseller ? (
                            <strike
                                className='text-gray-200 rebate rounded-lg p-1 bg-orange-500 text-sm '>{price + price * 0.2}{currency}</strike>

                        ) : null}
                    </div>


                </div>
                <div className='flex items-center justify-left gap-1'>

                    <b className=' pb-1 text-sm text-gray-500 text-semibold '>Quantorium</b>
                    <p className=' pb-1 text-sm text-gray-600'>/ {name}</p>
                </div>
                <div className='flex items-center gap-1 mt-2'>
                    <div className={'text-sm'}>
                        4.8
                    </div>
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
                    <p className='pl-2 text-sm'>({reviews.length} Отзывов)</p>
                </div>
            </Link>
            <div className='flex items-center gap-2 mt-4 justify-center'>


                <button onClick={() => {
                    navigate(`/product/${id}`)
                }} id='lll' className='text-white px-4 py-2 font-medium    border-n  rounded-2xl hover:bg-indigo-600 '
                        style={{ fontSize: '16px'}}>
                    Купить Сейчас
                </button>

                {/*<button className='text-white px-4 py-3 font-medium text-sm  border-n  rounded-2xl'
                         style={{background: 'rgb(3, 50, 160)',}}>
                    Закинуть в корзину
                </button> */}
            </div>
        </div>
    )
}
export default ProductItem
