import React, {useState} from 'react'
import axios from "axios";
import {backendUrl} from "../App.jsx";
import {toast} from "react-toastify";
import {assets} from "../assets/admin_assets/assets.js";

const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const onSubmitHandler = async (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
            console.log(response)
            if (response.data.success) {
               setToken(response.data.token)
                toast.success('Вы успешно вошли в аккаунт')
            } else {
                toast.error(response.data.message)
            }

        }catch (error) {
            console.log(error)
            toast.error(error.message)

        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='w-100 min-h-screen flex items-center bg-blue-100 justify-center'>
            { loading ?(<div className='grid place-items-center min-h-[80vh]'>
                <div
                    className='w-12 h-12 place-self-center border-4 border-gray-400 border-t-blue-700 rounded-full animate-spin '>

                </div>
            </div>) : (<div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4 text-center'>Панель <span className='text-blue-700'>админа</span>
                </h1>
                <form onSubmit={onSubmitHandler} action="">
                    <div className={'mb-3 min-w-72'}>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Адрес</p>
                        <input value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email"
                               placeholder='Введите ваш email адрес' required={true}/>
                    </div>
                    <div className={'mb-3 min-w-72'}>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Пароль</p>
                        <input value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password"
                               placeholder='введите ваш пароль'/>
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-blue-700 rounded-xl'
                            type='submit'>Войти
                    </button>
                </form>
            </div>)}

        </div>
    )
}
export default Login
