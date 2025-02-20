import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";


import {toast} from "react-toastify";


import {assets} from "../assets/assets.js";
import './Login.css'
import {ShopContext} from "../context/ShopContext.jsx";
import axios from "axios";
const Login = () => {



    const [authState, setAuthState] = useState('')

    const [password, setPassword] = useState('');

    const [isAuthenticating, setIsAuthenticating] = useState(false);


    const [error, setError] = useState(null);
    const [loginState, setLoginState] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState('Error!! at sending the message!')




    const [email, setEmail] = useState('')
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
