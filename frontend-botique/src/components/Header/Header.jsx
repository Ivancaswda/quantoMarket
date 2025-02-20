import React, {useContext, useState, useEffect, useRef} from 'react'
import {Link, NavLink} from "react-router-dom";
import './Header.css'
import {assets} from "../../assets/assets.js";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {ShopContext} from "../../context/ShopContext.jsx";
import { throttle } from "lodash";
import LazyLoad from "react-lazyload";
import {toast} from "react-toastify";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()
    let {userName,setUserName , setGlobalUser,  globalUser} = useContext(AuthContext)
    let {getCartCount, token, setToken, setCartItems} = useContext(ShopContext)
    let [isSticky, setIsSticky] = useState(false)
    let [firstLetter, setFirstLetter] = useState('')
    const headerRef = useRef(null); // Реф для отслеживания позиции инпута
    useEffect(() => {
        // Извлекаем первую букву из localStorage при загрузке компонента
        const savedFirstLetter = localStorage.getItem('firstLetter');
        if (savedFirstLetter) {
            setFirstLetter(savedFirstLetter);
        } else if (userName) {
            const letter = userName.charAt(0).toUpperCase();
            setFirstLetter(letter);
            localStorage.setItem('firstLetter', letter);
        }
    }, [userName]);



    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 768) {
                if (headerRef.current) {
                    const rect = headerRef.current.getBoundingClientRect();

                    if (rect.top < 0 && !isSticky) {
                        setIsSticky(true); // Устанавливаем fixed
                    } else if (rect.top >= 0 && isSticky) {
                        setIsSticky(false); // Сбрасываем fixed
                    }
                }
            } else {
                if (isSticky) {
                    setIsSticky(false); // Отключаем fixed на мобильных
                }
            }
        };

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsSticky(false); // Сбрасываем fixed при изменении размера
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems('')
        navigate('/')
        toast.info('Вы вышли из аккаунта!')
    }
    return (
        <div>
            <div className='w-100%  z-200 flex flex-col p-4 sm:p-2'>


                <div ref={headerRef}
                     className={`first-navbar flex items-center justify-between ${isSticky ? 'stickyHeader' : 'RDelative'} `}>
                    <div className='left-logo-container w-60 flex cursor-pointer   '>
                        <img onClick={() => {
                            navigate('/')
                        }} src="https://static.tildacdn.com/tild3933-3862-4431-b333-346435313930/_.png" alt=""/>
                    </div>
                    <div className='center-clauses-container flex items-center'>
                        <ul className=' hidden  lg:flex items-start  gap-7 font-semibold'>
                            <NavLink className="hover:no-underline hover:text-current" to='/'><p>Главная страница</p>
                                <hr className='border-b-2 border-blue-500 hidden'/>
                            </NavLink>
                            <NavLink className="hover:no-underline hover:text-current" to='/about'><p>О нас</p>
                                <hr className='border-b-2 border-blue-500 hidden'/>
                            </NavLink>

                            <NavLink className="hover:no-underline hover:text-current" to='/contact'><p>Связаться с
                                нами</p>
                                <hr className='border-b-2 border-blue-500 hidden'/>
                            </NavLink>
                        </ul>
                    </div>

                    <div className='right-btn-container   sm:w-100 justify-right flex    '>
                        <div style={{justifyContent: 'right'}}
                             className="flex items-center justify-right w-100  gap-5 ">


                            {!token ? (<Link to='/login'>
                                <button

                                    className="vee relative text-white font-semibold py-3 px-6 rounded-lg bg-blue-600 border-[3px]

                                    border-transparent overflow-hidden sm:py-1 px-3 text-sm  ">

                                    <span className="z-10 relative text-sm">Стать покупателем</span>


                                    <div

                                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-600 via-red-600 to-blue-500 animate-border"></div>


                                    <div className="absolute inset-0 flex items-center justify-center dots"></div>
                                    <div className="absolute inset-0 flex items-center justify-center dots"></div>
                                    <div className="absolute inset-0 flex items-center justify-center dots"></div>
                                    <div className="absolute inset-0 flex items-center justify-center dots"></div>
                                </button>


                            </Link>) : (


                                <div className='flex items-center gap-2 group'>
                                    <LazyLoad>

                                        <img width='35px' height='35px'
                                             src="https://www.pinclipart.com/picdir/big/164-1640714_user-symbol-interface-contact-phone-set-add-sign.png"
                                             alt=""/>

                                    </LazyLoad>
                                    <img className='color-red w-2.5 group-hover:color:blue-700 cursor-pointer'
                                         src={assets.dropdown_icon}
                                         alt=""/>

                                    <div
                                        className='absolute top-0  pt-14 text-base font-medium text-gray-600 z-20 top-5 right-0 hidden group-hover:block'> {/* dropDown of input */}

                                        <div
                                            className='min-w-48 bg-blue-100 flex flex-col group gap-4 p-4 top-25 '>

                                            <p onClick={() => {
                                                navigate('/profile')
                                            }}
                                                className='hover:text-blue-800 cursor-pointer flex items-center gap-2'>Профиль
                                                <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 448 512">
                                                    <path
                                                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                                                </svg>
                                            </p>

                                            <p onClick={() => {
                                                navigate('/orders')
                                            }}
                                                className='hover:text-blue-800 cursor-pointer flex items-center gap-2'>

                                                Заказы <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 576 512">
                                            <path
                                                    d="M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z"/>
                                            </svg></p>
                                            <p onClick={logout}
                                               className='hover:text-blue-800 cursor-pointer flex items-center gap-2'>Выйти
                                                <svg className='hover:text-blue-800' width='18' height='18'
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <path
                                                        d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                                                </svg>
                                            </p>
                                        </div>

                                    </div>

                                </div>


                            )

                            }

                            <svg onClick={() => {
                                setShowMenu(true)
                            }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-text-right  cursor-pointer lg:hidden flex" viewBox="0 0 16 16">
                                <path
                                    d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                            </svg>


                            <div
                                className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'> {/* dropDown of input */}

                                <div className='min-w-48 bg-stone-100 flex flex-col group gap-4 p-4 '>

                                    <Link to='/profile'><p className='hover:text-black cursor-pointer'>Профиль</p>
                                    </Link>
                                    <Link to={'/my-appointments'}><p className='hover:text-black cursor-pointer'>Мои
                                        направления</p></Link>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Выйти</p>
                                </div>

                            </div>
                            <Link to='/cart' className='relative'>
                                <img src={assets.cart_logo} className='w-5 min-w-5' alt=''/>
                                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-blue-700

                    text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p> {/* aspect-square creates perfect square and we rounded it 50% and mountint */}
                            </Link>
                        </div>
                    </div>

                    {/*------Mobile Menu---------- */}

                    <div
                        className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} lg:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-500`}>
                        <div className='flex items-center sm:flex-cols flex  justify-between px-5 py-6 '>
                            <img className='w-50' src={assets.logo} alt=""/>
                            <svg onClick={() => {
                                setShowMenu(false)
                            }} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                 className="bi bi-x-lg cursor-pointer" viewBox="0 0 16 16">
                                <path
                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </div>
                        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                            {!globalUser ? (<NavLink to='/login' onClick={() => {
                                setShowMenu(false)
                            }}>
                                <p className='px-4 py-2 rounded inline-block'>Зарегистрироваться</p>
                            </NavLink>) : (

                                <div className='flex flex-col items-center justify-center gap-5'>
                                    <p className='px-4 text-white py-2 rounded inline-block bg-red-500'>
                                        Выйти из аккаунта
                                    </p>

                                    <button
                                        className="bee  relative text-white font-semibold py-3 px-6 rounded-lg bg-blue-600 border-[3px]
                                         border-transparent overflow-hidden sm:py-1 px-3 text-sm  ">
                                        <span className="z-10 relative text-sm">Стать покупателем</span>

                                        <div
                                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-600 via-red-600 to-blue-500 animate-border"></div>

                                        <div
                                            className="absolute inset-0 flex items-center justify-center dots"></div>
                                    </button>

                                </div>
                            )}

                            <NavLink onClick={() => {
                                setShowMenu(false)
                            }
                            } to='/'><p className='px-4 py-2 rounded inline-block'>Главная страница</p></NavLink>
                            <NavLink onClick={() => {
                                setShowMenu(false)
                            }}
                                     to='/about'><p>О нас</p></NavLink>
                            <NavLink onClick={() => {
                                setShowMenu(false)
                            }}
                                     to='/collection'><p>Весь мерч</p></NavLink>

                            <NavLink onClick={() => {
                                setShowMenu(false)
                            }} to='/contact'><p className='px-4 py-2 rounded inline-block'>СВЯЗАТЬСЯ С НАМИ</p>
                            </NavLink>
                        </ul>
                    </div>
                </div>
                <div className='second-navbar '>

                    <div id='tag-slider' className='flex items-center'>
                        <ul id='infinite-scroll' className='flex items-center gap-10 mr-30 w-100 '>


                            <NavLink>


                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 640 512" width='13px' height='13px'>
                                        <path
                                            d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z"/>
                                    </svg>
                                    Обучениe
                                </li>

                            </NavLink>
                            <a className='text-black no-underline' href="https://kvantoriumtomsk.ru/news">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512" width='13px' height='13px'>
                                    <path
                                        d="M96 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L80 480c-44.2 0-80-35.8-80-80L0 128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 272c0 8.8 7.2 16 16 16s16-7.2 16-16L96 96zm64 24l0 80c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24l0-80c0-13.3-10.7-24-24-24L184 96c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16z"/>
                                </svg>
                                Новости
                            </li>
                            </a>
                                <a className='text-black no-underline' href="https://kvantoriumproject.ru/"><li>
                                    <svg width='13px' height='13px' xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                         </svg>
                                       Проекты
                                          </li>
                            </a>
                            <a target='_blank' className='text-black no-underline' href="https://kvantoriumtomsk.ru/svedeniya">
                            <li>Сведения об образовательной организации</li>
                            </a>
                            <a target='_blank' className='text-black no-underline' href="https://technopredki.ru/">
                                <li>Технопредки</li>
                            </a>
                            <a target='_blank' className='text-black no-underline' href="https://kvantoriumtomsk.ru/masterklassy">
                            <li>Мастер-классы</li>
                            </a>
                            <a target='_blank' className='text-black no-underline' href="https://kvantoriumtomsk.ru/2024">
                            <li>
                                <svg width='13px' height='13px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 640 512">
                                    <path
                                        d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 160a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM144 256a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm312 40a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM226.9 491.4L200 441.5l0 38.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-38.5L61.1 491.4c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3l19.5 0c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3l19.5 0c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6l19.5 0c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5l0 38.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-38.5-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5l0 54.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-54.5-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z"/>
                                </svg>
                                Год семьи
                            </li>
                            </a>
                            <a target='_blank' className='text-black no-underline' href="https://expotechjunior.ru/yarmarkaidei">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path
                                            d="M269.4 6C280.5-2 295.5-2 306.6 6l224 160c7.4 5.3 12.2 13.5 13.2 22.5l32 288c1 9-1.9 18.1-8 24.9s-14.7 10.7-23.8 10.7l-80 0-28.2 0c-12.1 0-23.2-6.8-28.6-17.7L306.7 293.5c-1.7-3.4-5.1-5.5-8.8-5.5c-5.5 0-9.9 4.4-9.9 9.9L288 480c0 17.7-14.3 32-32 32l-16 0L32 512c-9.1 0-17.8-3.9-23.8-10.7s-9-15.8-8-24.9l32-288c1-9 5.8-17.2 13.2-22.5L269.4 6z"/>
                                    </svg>
                                    Ярмарка проектов
                                </li>
                            </a>
                            <a target='_blank' className='text-black no-underline' href="https://kvantoriumtomsk.ru/kvadrotom">
                                <li>Квадротом</li>
                            </a>
                            <a target='_blank' className='text-black no-underline'  href="https://kvantoriumtomsk.ru/zimnyekanikuly2025">
                            <li>
                                <svg width='13px' height='13px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512">
                                    <path
                                        d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208l24.9 0L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320L80 320 5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5L192 448l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 168.5 0c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320l33.4 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208l24.9 0c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z"/>
                                </svg>
                                Новогодние каникулы
                            </li>
                            </a>
                            <li>Инженерное волонтерство</li>
                            <li>Сведения об образовательной организации</li>
                            <li>Технопредки</li>
                            <li>Мастер-классы</li>
                            <li>
                                <svg width='13px' height='13px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 640 512">
                                    <path
                                        d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 160a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM144 256a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm312 40a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM226.9 491.4L200 441.5l0 38.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-38.5L61.1 491.4c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3l19.5 0c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3l19.5 0c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6l19.5 0c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5l0 38.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-38.5-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5l0 54.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-54.5-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z"/>
                                </svg>
                                Год семьи
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path
                                        d="M269.4 6C280.5-2 295.5-2 306.6 6l224 160c7.4 5.3 12.2 13.5 13.2 22.5l32 288c1 9-1.9 18.1-8 24.9s-14.7 10.7-23.8 10.7l-80 0-28.2 0c-12.1 0-23.2-6.8-28.6-17.7L306.7 293.5c-1.7-3.4-5.1-5.5-8.8-5.5c-5.5 0-9.9 4.4-9.9 9.9L288 480c0 17.7-14.3 32-32 32l-16 0L32 512c-9.1 0-17.8-3.9-23.8-10.7s-9-15.8-8-24.9l32-288c1-9 5.8-17.2 13.2-22.5L269.4 6z"/>
                                </svg>
                                Ярмарка проектов
                            </li>
                            <li>Квадротом</li>
                            <li>
                                <svg width='13px' height='13px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512">
                                    <path
                                        d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208l24.9 0L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320L80 320 5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5L192 448l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 168.5 0c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320l33.4 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208l24.9 0c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z"/>
                                </svg>
                                Новогодние каникулы
                            </li>
                            <li>Инженерное волонтерство</li>
                        </ul>


                        <ul id='infinite-scroll1' className='flex items-center gap-10 mr-40 w-100 '>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 640 512" width='13px' height='13px'>
                                    <path
                                        d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z"/>
                                </svg>
                                Обучениe
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512" width='13px' height='13px'>
                                    <path
                                        d="M96 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L80 480c-44.2 0-80-35.8-80-80L0 128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 272c0 8.8 7.2 16 16 16s16-7.2 16-16L96 96zm64 24l0 80c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24l0-80c0-13.3-10.7-24-24-24L184 96c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16z"/>
                                </svg>
                                Новости
                            </li>
                            <li>
                                <svg width='13px' height='13px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <path
                                        d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                </svg>
                                Проекты
                            </li>
                            <li>Сведения об образовательной организации</li>
                            <li>Технопредки</li>
                            <li>Мастер-классы</li>
                            <li>
                                <svg width='13px' height='13px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 640 512">
                                    <path
                                        d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 160a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM144 256a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm312 40a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM226.9 491.4L200 441.5l0 38.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-38.5L61.1 491.4c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3l19.5 0c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3l19.5 0c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6l19.5 0c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5l0 38.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-38.5-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5l0 54.5c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32l0-54.5-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z"/>
                                </svg>
                                Год семьи
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path
                                        d="M269.4 6C280.5-2 295.5-2 306.6 6l224 160c7.4 5.3 12.2 13.5 13.2 22.5l32 288c1 9-1.9 18.1-8 24.9s-14.7 10.7-23.8 10.7l-80 0-28.2 0c-12.1 0-23.2-6.8-28.6-17.7L306.7 293.5c-1.7-3.4-5.1-5.5-8.8-5.5c-5.5 0-9.9 4.4-9.9 9.9L288 480c0 17.7-14.3 32-32 32l-16 0L32 512c-9.1 0-17.8-3.9-23.8-10.7s-9-15.8-8-24.9l32-288c1-9 5.8-17.2 13.2-22.5L269.4 6z"/>
                                </svg>
                                Ярмарка проектов
                            </li>
                            <li>Квадротом</li>
                            <li>
                                <svg width='13px' height='13px' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512">
                                    <path
                                        d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208l24.9 0L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320L80 320 5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5L192 448l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 168.5 0c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320l33.4 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208l24.9 0c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z"/>
                                </svg>
                                Новогодние каникулы
                            </li>
                            <li>Инженерное волонтерство</li>

                        </ul>

                    </div>
                </div>
                <div id='hidden' className='p-2 flex flex-col bg-white text-gray-700 text-sm w-40 gap-2 absolute cursor-pointer   ' style={{listStyle:'none', top: '120px' , zIndex: '200',boxShadow: '2px 2px 5px black'}}>
                    <li className='hover:underline'>5-11 класс</li>
                    <li className='hover:underline'>1-4 класс</li>
                    <li className='hover:underline'>Для дошкольников</li>
                    <li className='hover:underline'>Расписание</li>
                    <li className='hover:underline'>Ресурсы</li>
                    <li className='hover:underline'>Каникулы в Кванториуме</li>
                </div>
            </div>
        </div>
    )
}
export default Header
