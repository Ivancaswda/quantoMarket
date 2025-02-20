import React, {useState} from 'react';
import './About.css';
import NewsletterBox from "../components/NewsletterBox/NewsletterBox.jsx";

const About = () => {
    let [loading, setLoading] = useState(true)

    // Функция, которая будет вызываться, когда изображение загружено
    const handleImageLoad = () => {
        setLoading(false); // Изображение загружено, меняем состояние на false
    };

    // Функция для обработки ошибок при загрузке изображения
    const handleImageError = () => {
        setLoading(false); // Если возникла ошибка, также меняем состояние на false
        console.error('Ошибка загрузки изображения');
    };

    // Вы можете добавить setTimeout, чтобы увидеть визуальный индикатор загрузки


    return (
        <div>
            <div className="flex flex-col gap-2 items-center" style={{ marginBottom: '90px', marginTop: '90px' }}>
                <h1 className="text-3xl font-semibold text-black z-10">О нас и чем мы занимаемся</h1>
            </div>

            <div className="my-20 flex flex-col md:flex-row gap-16">



                        <img
                            onLoad={handleImageLoad}
                            onError={handleImageError} // Обработчик ошибки загрузки
                            className="w-full md:max-w-[550px]"
                            style={{ borderBottomRightRadius: '40px', borderTopRightRadius: '40px' }}
                            src="https://optim.tildacdn.com/tild6265-3765-4733-b863-653835356334/-/resize/500x400/-/format/webp/DSC_0951-2.jpg"
                            alt="О нас"
                        />

                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam architecto assumenda
                        atque autem est eum exercitationem laborum mollitia, obcaecati pariatur placeat quae
                        repudiandae sunt suscipit tempore vel velit veritatis voluptatem voluptates! Aperiam
                        exercitationem mollitia, quia tempore tenetur totам?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam architecto assumenda
                        atque autem est eum exercitationem laborum mollitia, obcaecati pariatur placeat quae
                        repudiandae sunt suscipit tempore vel velit veritatis voluptatem voluptates! Aperiam
                        exercitationem mollitia, quia tempore tenetur totam?
                    </p>
                </div>
            </div>

            <div className="text-4xl py-4 w-full flex items-center justify-center">
                <h1>Почему выбирают <b className="text-blue-700">нас</b></h1>
            </div>

            <NewsletterBox />

            <div className="w-full" style={{ height: '100vh' }}>
                {/* Контент ниже изображения */}
                <div className="w-full h-full relative bg-cover bg-center imagedd">
                    {/* Это будет фоновое изображение */}
                    <div id="inject" className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20">
                        {/* Ваши элементы, которые находятся на фоне */}
                    </div>

                    {/* Другие элементы, которые будут поверх фона */}
                    <div className="absolute top-0 left-0 z-30 w-full h-full flex flex-col items-center justify-center mt-10 gap-16">
                        <div id="image-container" className="flex items-center relative">
                            <img
                                src="https://static.tildacdn.com/tild3931-6461-4664-b865-343136633437/logo_kvant.png"
                                alt="Logo"
                                className="z-30 w-60"
                                id="big-image"
                            />
                        </div>
                        <h1 className="text-white font-semibold" style={{ fontSize: '45px' }}>
                            Федеральная сеть детских технопарков
                        </h1>

                        <button className="px-8 py-3 font-medium text-blue-700 rounded-3xl text-sm bg-white text-black">
                            <a className="underline-none" href="http://roskvantorium.ru/">
                                Подробнее
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;