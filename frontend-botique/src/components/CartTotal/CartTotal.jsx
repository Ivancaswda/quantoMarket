import React, {useContext} from 'react'
import {ShopContext} from "../../context/ShopContext.jsx";

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext)
    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <h1>Всего в корзине</h1>
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Всего (без налогов)</p>
                    <p>{(getCartAmount()).toFixed(2)}{currency}</p>

                </div>
                <hr/>
                <div className='flex justify-between'>
                    <p>Налог на услуги</p>
                    <p>{(delivery_fee).toFixed(2)}{currency}</p>

                </div>
                <hr/>
                <div className='flex justify-between'>
                    <p>Всего (с налогом)</p>
                    <p className='font-semibold text-lg'>{(getCartAmount() <= 0 ? 0 : getCartAmount() + delivery_fee).toFixed(2)}{currency}</p>

                </div>
            </div>
        </div>
    )
}
export default CartTotal
