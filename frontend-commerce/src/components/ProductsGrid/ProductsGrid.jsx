import React, {useContext, useEffect, useState, useRef} from 'react'
import {ShopContext} from "../../context/ShopContext.jsx";
import ProductItem from "../ProductItem/ProductItem.jsx";
import './ProductsGrid.css'

const ProductsGrid = () => {
    const {products} = useContext(ShopContext)

    const [latestProducts, setLatestProducts] = useState([])

    const [otherProducts, setOtherProducts] = useState([])

    const [bestSeller, setBestSeller] = useState([])

    const [inputFilterValue, setInputFilterValue] = useState('')

    const [showFilter, setShowFilter] = useState(false)

    const [isSticky, setIsSticky] = useState(false); // Состояние для липкости
    const inputRef = useRef(null); // Реф для отслеживания позиции инпута

    useEffect(() => {
        const handleScroll = () => {

            if (inputRef.current) {
                const rect = inputRef.current.getBoundingClientRect();

                if (rect.top <= 0) {
                    setIsSticky(true); // Если инпут достигает верхней границы
                } else  {
                    setIsSticky(false); // Если инпут ниже верхней границы
                }
            }
        };


        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {


    const bestProduct = products.filter((item) => {
        return item.bestseller === true
    })
    setBestSeller(bestProduct.slice(0,5))

    }, [products])
    let productsCopy = products.slice()


         productsCopy = productsCopy.filter((item) => {
                if (item.name.toLowerCase().includes(inputFilterValue.toLowerCase())) {
                    return true
                }else {

                    return false
                }
         })


    useEffect(() => {
        setLatestProducts(productsCopy.slice(0, 4))
        setOtherProducts(products.slice(4, 16))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl' style={{}}>
                <h1 className='flex items-center justify-center gap-2 mr-auto ml-auto'><b>Наши</b>

                    <button
                        className="relative text-white font-semibold py-1  px-3 rounded-3xl bg-green-500 border-[3px] border-transparent overflow-hidden">
                        <span className="z-10 relative text-2xl text-center bottom-1">недавние товары</span>

                        <div
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-green-400 to-violet-400 animate-border"></div>

                        <div className="absolute inset-0 flex items-center justify-center dots"></div>
                    </button>


                </h1>

                <p className='w-3/4 text-center ml-auto mr-auto text-xs sm:text-sm md:text-base text-gray-600 mt-10'>
                    Посмотрите на товары которые вырвались в топ нашей уникальной коллекции и присмотрите что-нибудь из
                    этого себе! Не упустите шанс наших коротковременных распродаж! Вся информация по этой теме и не
                    только у нас в <span className='text-blue-500'>Telegram </span>
                </p>

                {/* Устанавливаем продукты*/}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-10 mt-20 gap-y-6'>
                    {
                        latestProducts.reverse().map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name}
                                         price={item.price} bestseller={item.bestseller}/>
                        ))
                    }
                </div>

            </div>

            <div className='text-center py-8 text-3xl' style={{}}>
                <h1 className='flex items-center justify-center gap-2 mr-auto ml-auto'><b>Наши товары</b>

                    <button
                        className="relative text-white font-semibold py-1  px-3 rounded-3xl bg-red-500 border-[3px] border-transparent overflow-hidden">
                        <span className="z-10 relative text-2xl text-center bottom-1">лучшей категории</span>

                        <div
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 animate-border"></div>

                        <div className="absolute inset-0 flex items-center justify-center dots"></div>
                    </button>


                </h1>

                <p className='w-3/4 text-center ml-auto mr-auto text-xs sm:text-sm md:text-base text-gray-600 mt-10'>
                    Посмотрите на товары которые вырвались в топ нашей уникальной коллекции и присмотрите что-нибудь из
                    этого себе! Не упустите шанс наших коротковременных распродаж! Вся информация по этой теме и не
                    только у нас в <span className='text-blue-500'>Telegram </span>
                </p>

                {/* Устанавливаем продукты*/}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-20 gap-y-6'>
                    {
                        bestSeller.reverse().map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name}
                                         price={item.price} bestseller={item.bestseller}/>
                        ))
                    }
                </div>

            </div>
            <img src="https://ir.ozone.ru/s3/cms/ac/t12/wc1450/00.jpg" className='rounded-3xl' alt=""/>
            <div className='text-center py-8 text-3xl'>
                <div className='flex items-center flex-col'>
                    <h1 className='flex items-center justify-center gap-2 mr-auto ml-auto'><b>Наши товары</b></h1>
                    <div className='items-center flex'>


                        <p className='w-3/4 text-center ml-auto mr-auto text-xs sm:text-sm md:text-base text-gray-600 mt-10'>
                            Посмотрите на товары которые вырвались в топ нашей уникальной коллекции и присмотрите
                            что-нибудь из
                            этого себе! Не упустите шанс наших коротковременных распродаж! Вся информация по этой теме и
                            не
                            только у нас в <span className='text-blue-500'>Telegram </span>
                        </p>


                    </div>
                </div>
                {/* Устанавливаем продукты*/}
                <div
                    ref={inputRef}
                    id={isSticky ? 'stickyh' : ''}
                    className={`input-container ${isSticky ? '' : ''} `}
                >
                    <input  ref={inputRef} value={inputFilterValue} onChange={(e) => {
                        setInputFilterValue(e.target.value)
                    }} type="text" placeholder="Type something..."/>
                    <button className='search-button'>

                        {!isSticky ? (<svg width='28px' height='28px' xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512">
                            <path fill="white"
                                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                        ) : (
                            <svg onClick={() => {
                                setIsSticky(false)
                            }} width='28px' height='28px' xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 384 512">
                                <path fill="white"
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                            </svg>
                        )}
                    </button>
                </div>


                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-20 gap-y-6'>
                    {
                        productsCopy.length > 0 ? (


                            productsCopy.reverse().map((item, index) => (
                                <ProductItem key={index} id={item._id} image={item.image} name={item.name}
                                             price={item.price} bestseller={item.bestseller}/>
                            ))
                        ) : (
                            <div style={{width: '100vw', fontSize: '24px'}} className='flex items-center gap-2 justify-center'>
                                <p>Похоже такой товар не найден...</p>
                                <svg  width='20px' height='20px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <path fill='#0332a0'
                                        d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
                                </svg>
                            </div>
                        )
                    }
                </div>

            </div>


        </div>
    )
}
export default ProductsGrid
