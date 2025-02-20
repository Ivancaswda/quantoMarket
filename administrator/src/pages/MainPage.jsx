import React, { useEffect, useRef} from 'react'

import {useNavigate} from "react-router-dom";

const MainPage = () => {
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
    const navigate = useNavigate()

    return <div className='relative flex w-100  justify-center bg-[#ff8400]'>
        <canvas ref={canvasRef} style={{display: "block", width: '100%', height: '100vh'}} className='relative'>


        </canvas>
        <p className='absolute text-[45px] text-center text-[#003cd6] font-semibold' style={{marginTop: '200px'}}>Добро
            пожаловать в панель <br/><p
                className='text-2xl font-[400] mt-5'> {'аккаунта администратора'}</p></p>
        <svg id='animate' className='absolute' width='34' height='34' style={{marginTop: '290px'}} xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 384 512">
            <path fill='white'
                d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
        </svg>
        <button onClick={() => {
            navigate(`/add-product`)
        }} style={{marginTop: '350px'}}
                className='hover:scale-105 duration-200 transition-all absolute bg-white font-semibold px-5 py-3 text-gray-700 rounded-full border text-lg'>
            Перейти к <span className='text-[#003cd6] font-semibold'>DashBoard</span>
        </button>

    </div>

}
export default MainPage
