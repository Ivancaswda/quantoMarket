import React, {useContext} from 'react'
import {ShopContext} from "../../context/ShopContext.jsx";


const NewsletterBox = () => {
    let date = new Date()
    let today = date.getDate()
    let {showModal, setShowModal} = useContext(ShopContext)
    return (
        <div className='text-center  h-100 flex items-center justify-center flex-col pl-20 pr-20'>


            <svg onClick={() => {
                setShowModal(false)
            }} width='26' height='26' className={`${!showModal ? 'hidden' : ''}  position-absolute right-0 top-0`} xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 384 512">
                <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>

            <svg width='140px' height='140px' xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 576 512">
                <path fill="#0634a3"
                      d="M97.2 96.2c10.4-10.7 16-17.1 16-21.9 0-2.8-1.9-5.5-3.8-7.4A14.8 14.8 0 0 0 101 64.1c-8.5 0-20.9 8.8-35.8 25.7C23.7 137 2.5 182.8 3.4 250.3s17.5 117 54.1 161.9C76.2 435.9 90.6 448 100.9 448a13.6 13.6 0 0 0 8.4-3.8c1.9-2.8 3.8-5.6 3.8-8.4 0-5.6-3.9-12.2-13.2-20.6-44.5-42.3-67.3-97-67.5-165C32.3 188.8 54 137.8 97.2 96.2zM239.5 420.1c.6 .4 .9 .6 .9 .6zm93.8 .6 .2-.1C333.2 420.6 333.2 420.7 333.3 420.6zm3.1-158.2c-16.2-4.2 50.4-82.9-68.1-177.2 0 0 15.5 49.4-62.8 159.6-74.3 104.4 23.5 168.7 34 175.2-6.7-4.4-47.4-35.7 9.6-128.6 11-18.3 25.5-34.9 43.5-72.2 0 0 15.9 22.5 7.6 71.1C287.7 364 354 342.9 355 343.9c22.8 26.8-17.7 73.5-21.6 76.6 5.5-3.7 117.7-78 33-188.1C360.4 238.4 352.6 266.6 336.4 262.4zM510.9 89.7C496 72.8 483.5 64 475 64a14.8 14.8 0 0 0 -8.4 2.8c-1.9 1.9-3.8 4.7-3.8 7.4 0 4.8 5.6 11.3 16 21.9 43.2 41.6 65 92.6 64.8 154.1-.2 68-23 122.6-67.5 165-9.3 8.4-13.2 14.9-13.2 20.6 0 2.8 1.9 5.6 3.8 8.4A13.6 13.6 0 0 0 475.1 448c10.3 0 24.7-12.1 43.5-35.8 36.6-44.9 53.1-94.4 54.1-161.9S552.3 137 510.9 89.7z"/>
            </svg>


            <p className='text-2xl font-medium text-gray-800'>
                Создай аккаунт сейчас & получи -20% скидку
            </p>
            <p className='text-gray-400 mt-3'>
                Схвати возможность получить скидку 20% на покупки в нашем онлайн магазине до {today + 3} декабря 2024
                года!
            </p>
            <form onSubmit={(e) => {
                e.preventDefault()
            }} className='w-100 sm:w-1/2 flex items-center gap-3  my-6 '>
                <input required={true} className='w-100 sm:flex-1 outline-none px-3 py-3'
                       placeholder='Введите промокод для продолжения' type="password"/>
                <button type='submit' style={{background: 'rgb(3, 50, 160)'}}
                        className=' text-white text-xs px-3 py-3'>Отправится к регистрации
                </button>
            </form>
        </div>
    )
}
export default NewsletterBox
