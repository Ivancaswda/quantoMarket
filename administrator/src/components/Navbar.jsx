import React from 'react'
import {assets} from "../assets/admin_assets/assets.js";

const Navbar = ({setToken}) => {
    return (
        <div className='flex items-center justify-between py-2 px-[4%]'>


                <img className='w-[max(3%,20px)]' src={assets.quantorium_icon} alt=""/>



            <button onClick={() => {
                setToken('')
            }}
                    className='bg-blue-700 font-semibold text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Выйти
            </button>
        </div>
    )
}
export default Navbar
