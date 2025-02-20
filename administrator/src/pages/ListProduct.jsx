import React, {useEffect, useState} from 'react'
import axios from "axios";
import {backendUrl} from "../App.jsx";
import {toast} from "react-toastify";
import {assets} from "../assets/admin_assets/assets.js";

const ListProduct = ({token}) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchList = async () => {
        // calling api and getting list of all products
        try {
            setLoading(true)
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setList(response.data.products)
                console.log(response.data.products)

            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const removeProduct = async (id) => {
        try {
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {token}})
            if (response.data.success) {
                toast.success(response.data.message) // перезагружаем страницу сразу же
                await fetchList()
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])
    if (list.length === 0) {
        return <div className='w-100 h-100 text-center'>
            <svg className='mr-auto ml-auto mt-6 mb-6' width='40' height='40' xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
                <path fill='blue'
                    d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
            </svg>
            <p className='text-blue-700 font-semibold'>Вы пока еще не разместили товары!</p>
        </div>
    }
    return (
        <div>
            <p className='mb-2'>Весь лист продуктов</p>
            {loading ? (<div className='grid place-items-center min-h-[80vh]'>
                <div
                    className='w-12 h-12 place-self-center border-4 border-gray-400 border-t-blue-700 rounded-full animate-spin '>

                </div>
            </div>) : (<div className='flex flex-col gap-2'>
                {/* List table title */}
                <div
                    className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-blue-100 text-sm'>
                    <b className='text-center'>Изображение</b>
                <b className='text-center'>Имя</b>
                <b className='text-center'>Категория</b>

                <b className='text-center'>Цена</b>
                <b className='text-center'>Действие</b>
            </div>

            {/* products*/}

            {
                list.map((item, index) => (
                    <div
                        className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-1 border-b text-center'
                        key={index}>
                        <img className='rounded-lg ' style={{width: '120px'}} src={item.image[0]} alt=""/>
                        <p>{item.name}</p>
                        <p>{item.category}</p>

                        <p>{item.price}₽</p>

                        <img onClick={() => {
                            removeProduct(item._id)
                        }} className='ml-auto mr-auto cursor-pointer' src={assets.cancel_icon} alt=""/>
                    </div>
                ))
            }

        </div>)
}

</div>
)
}
export default ListProduct
