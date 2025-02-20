import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import { doc, setDoc } from 'firebase/firestore';
import {toast} from "react-toastify";
import { db } from "../../firebase.js";
import {AuthContext} from "../context/AuthContext.jsx";
import { getAuth, GoogleAuthProvider, signInWithPopup,  OAuthProvider } from 'firebase/auth';
import {assets} from "../assets/assets.js";
import './Login.css'
import {ShopContext} from "../context/ShopContext.jsx";
import axios from "axios";
const Login = () => {



    const [authState, setAuthState] = useState('')

    const [password, setPassword] = useState('');

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const {signup, login, userName, setUserName, email, setEmail } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [loginState, setLoginState] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState('Error!! at sending the message!')



    async function handleAuthenticate() {
        if (!email || !email.includes('@') || !password || password.length < 6 || isAuthenticating) {
            setError("Введите корректные данные");
            setEmail(email)
            setUserName(userName)
            toast.error('Введите корректные данные!')
            return;
        }

        try {
            setIsAuthenticating(true);
            setError(null);
            setAuthState('')
            setEmail(email)
            setUserName(userName)
            let user;
            if (!loginState) {
                setAuthState('signup')
                user = await signup(email, password);

            } else {
                setAuthState('login')
                user = await login(email, password);
            }

            if (user) {
                navigate('/');
                toast.success(`Поздравляем 🎉, вы успешно ${authState === 'signup' ? 'зарегистрировались' : 'вошли в аккаунт'} `)
            }
        } catch (err) {
            console.log(err.message);
            toast.error(`Ошибка авторизации:       Введите верные данные! `)
            setError("Ошибка авторизации: " + err.message);
        } finally {
            setIsAuthenticating(false);
        }
    }

    // РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ ЧЕРЕЗ ГУГЛ
    async function handleGoogleLogin() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            setIsAuthenticating(true);
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Сохранение данных пользователя в Firestore
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                username: user.displayName,
                email: user.email,
            }, {merge: true});
            localStorage.setItem("email", JSON.stringify(user.email))
            setEmail(user.email);
            setUserName(user.displayName); // Set the state


            navigate('/');
            toast.success(`Поздравляем 🎉, вы успешно ${authState === 'signup' ? 'зарегистрировались' : 'вошли в аккаунт'} `)
        } catch (err) {
            console.error("Ошибка при входе через Google: ", err);
            toast.error(`Ошибка при входе через Google: ${err.message} `)
            setError("Ошибка при входе через Google: " + err.message);
        } finally {
            setIsAuthenticating(false);
        }
    }


    const {token, setToken,  backendUrl} = useContext(ShopContext)
    const [name, setName] = useState('')
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            // calling the authenticating user api for sign up
            if (!loginState) {
                const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
                if (response.data.success) {
                    setToken(response.data.token) // accessing token in mark of authentication
                    localStorage.setItem('token', response.data.token)
                    toast.info('Вы успешно создали аккаунт!')
                } else {
                    toast.error(response.data.message)
                }
            } else { // login authenticating user
                const response = await axios.post(backendUrl + '/api/user/login', {email, password})
                console.log(response.data)
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    toast.info('Вы успешно вошли в аккаунт!')
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])



    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Устанавливаем размеры canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Массив частиц
        const particles = [];
        const particleCount = 250;

        // Класс для частиц
        class Particle {
            constructor(x, y, radius, speedX, speedY, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.speedX = speedX;
                this.speedY = speedY;
                this.color = color;
            }

            // Рисуем частицу
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            // Обновляем позицию частицы
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Отражение от краев экрана
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                this.draw();
            }
        }

        // Инициализация частиц
        for (let i = 0; i < particleCount; i++) {
            const radius = Math.random() * 3 + 2; // Радиус частицы (2–5px)
            const x = Math.random() * canvas.width; // Начальная позиция X
            const y = Math.random() * canvas.height; // Начальная позиция Y
            const speedX = (Math.random() - 0.5) * 2; // Скорость по X
            const speedY = (Math.random() - 0.5) * 2; // Скорость по Y
            const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`; // Случайный цвет

            particles.push(new Particle(x, y, radius, speedX, speedY, color));
        }

        // Анимация
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas
            particles.forEach((particle) => particle.update()); // Обновляем каждую частицу
            requestAnimationFrame(animate); // Рекурсивно вызываем анимацию
        };

        animate();

        // Обновление размера canvas при изменении размера окна
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        // Удаляем обработчик событий при размонтировании
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div className='w-100  ' >
            { isAuthenticating ? (
                <div style={{height: '84vh'}} className='w-full flex flex-col items-center justify-center'>
                    <img src={assets.video} width='350px' alt="Loading animation"/>
                    <img src={assets.logo} className='w-25' alt=""/>


                </div>) : (


                <form id='bgshka' onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center relative justify-center'>
                <canvas className='relative' ref={canvasRef}>
                </canvas>
                    <div style={{background: 'white'}}
                         className={'flex mr-auto ml-auto  absolute flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'}>
                        <p className='text-2xl font-semibold'>{loginState ? 'Войти' : "Создать аккаунт"}</p>
                        <p className='text-1xl'>Пожалуйста {loginState ? 'Войдите в аккаунт' : 'Зарегистрируйтесь'} чтобы
                            стать <span className='text-blue-600'> покупателем</span></p>
                        {!loginState && (
                            <div className='w-full'>
                                <p>Имя</p>
                                <input className='border border-zinc-300 rounded w-full p-2 mt-1' required={true}
                                       type='text' value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }}/>
                            </div>
                        )}
                        <div className='w-full'>
                            <p>Email-почта</p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1' required={true}
                                   type="email"
                                   value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                        </div>

                        <div>
                            <p>Пароль</p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1' required={true}
                                   type="password" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }}/>
                        </div>
                        {loginState && (
                            <Link to='/resetPassword'><p className='hover:underline'>Забыли пароль?</p></Link>
                        )}

                        <button
                                className={'bg-primary text-white w-full py-2 rounded-md text-base'}>{loginState ? 'Авторизироваться' : 'Зарегистрироваться'}

                        </button>

                        <div className='border flex items-center justify-center w-full'>


                            <button style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={handleGoogleLogin}
                                    className='  flex items-center gap-3 justify-center  text-black w-60 py-2 rounded-md text-base'>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 488 512" width='18px' height='18px'>
                                    <path
                                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                                </svg>
                                {!loginState ? 'Создать через Goggle' : 'Войти через Goggle'}

                            </button>

                        </div>


                        {isAuthenticating ? 'Инициализируем...' :
                            !loginState ? (<p>Уже были у нас? <span onClick={() => {
                                    setLoginState(!loginState)
                                }} className='text-primary underline cursor-pointer'>Войти в аккаунт</span></p>)
                                : (<p>Впервые на сайте? <span className='text-primary underline cursor-pointer'
                                                              onClick={() => {
                                                                  setLoginState(!loginState)
                                                              }}>Создать аккаунт</span></p>)
                        }


                    </div>

                </form>

            )}
        </div>

    )

}
export default Login
