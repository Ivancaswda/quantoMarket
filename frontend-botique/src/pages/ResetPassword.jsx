import React, {useContext} from 'react'
import {useState, useEffect} from "react";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../firebase.js";
import InputMask from 'react-input-mask';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthContext.jsx";

const ResetPassword = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('')

    const [viaEmail, setViaEmail] = useState(true)
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const {phoneNumber , setPhoneNumber} = useContext(AuthContext)
    // Добавляем useEffect для отслеживания успеха
    useEffect(() => {
        if (success) {
            // Перенаправление на главную страницу через 3 секунды
            const timer = setTimeout(() => {
                navigate('/');
            }, 200)

            // Очищаем таймер при размонтировании
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    async function handleSubmit(e) {

        e.preventDefault()

        setEmail('')
        setMessage('')
        setError('')


        if (!email) {
            toast.error('Пожалуйста, введите ваш email')
            return;
        }

        try {

            await sendPasswordResetEmail(auth, email)
            setSuccess(true)
            toast.success('На вашу почту отправлено письмо с инструкциями для сброса пароля.')
        } catch (err) {
            setSuccess(false)
            toast.error('Ошибка при отправке письма: ' + err.message)
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
                <div
                    className={'flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'}>
                    <div className='flex justify-between items-center w-full'>


                        <p className='text-2xl font-semibold'>Сброс пароля</p>
                        {viaEmail ? (<svg className='cursor-pointer' onClick={() => {
                            setViaEmail(false)
                        }} width='20px' height='20px' xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 512 512">
                            <path fill="#5f6fff"
                                  d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                        </svg>) : (

                            <svg onClick={() => {
                                setViaEmail(true)
                            }} width='20px' height='20px' className='cursor-pointer' xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path fill="#5f6fff"
                                      d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                            </svg>

                        )}
                    </div>
                    <p className='text-1xl'>Пожалуйста укажите ваш {viaEmail ? 'email' : 'номер телефона'} чтобы
                        сбросить пароль</p>

                    {viaEmail ? (<div className='w-full'>
                            <p>Email-почта</p>
                            <input className={`border border-zinc-300 rounded w-${viaEmail ? 'full' : '100'} p-2 mt-1`}
                                   required={true}
                                   type="email"
                                   value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                        </div>
                    ) : (
                        <div className='w-full'>
                            <p>Номер телефона</p>
                            <div className='flex items-center gap-2 '>
                                <img title='Мы пока не работаем в других странах кромер РФ'
                                     className='cursor-pointer w-8'
                                     src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs3Nv1dUHgTVa6Ic6VI-NH3BTQixaZmoLItQ&s'
                                     alt=""/>

                                <InputMask mask="7-(999)-999-99-99"
                                           maskChar={null}
                                           placeholder="7-(___)-___-__-__"
                                           className='border border-zinc-300 rounded w-full p-2 mt-1'
                                           required={true}

                                           value={phoneNumber} onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                }}>

                                    {(inputProps) => <input {...inputProps} />}

                                </InputMask>
                            </div>
                        </div>
                    )}

                    <button
                        className={'bg-primary text-white w-full py-2 rounded-md text-base'}>Отправить на
                        ваш {viaEmail ? 'Email' : 'телефон'}

                    </button>


                    <p>Вспомнили пароль? <Link to='/login' className='text-primary underline cursor-pointer'>Войти в
                        аккаунт</Link></p>


                </div>
            </form>

        </div>
    )
}
export default ResetPassword
