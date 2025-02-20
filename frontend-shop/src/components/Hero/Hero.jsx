import React, { useState } from 'react';
import {assets} from "../../assets/assets.js";


const Hero = () => {
    // Состояние для отслеживания загрузки изображений
    const [loading, setLoading] = useState(true);

    // Функция, которая будет вызываться, когда изображение загружено
    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active rounded-2xl">
                        {loading ? (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 2,
                                    color: 'white',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    textShadow: '5px 5px 20px black',
                                }}
                            >
                                <img src={assets.videoPng} width='350px' alt="Loading animation"/>
                            </div>
                        ) : (




                      <img
                            className="d-block w-100 rounded-2xl"
                            src="https://optim.tildacdn.com/tild3931-3837-4664-a139-316635646166/-/resize/500x400/-/format/webp/DSC_0227-2.jpg"
                            alt="First slide"
                            onLoad={handleImageLoad} // Вызываем handleImageLoad, когда изображение загружено
                        />
                        )}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: '0',
                                zIndex: '2',
                            }}
                            className="justify-center flex align-center"
                        >
                            <h5 className="text-7xl font-bold text-white" style={{ textShadow: '5px 5px 20px black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Создавай
                            </h5>
                        </div>
                    </div>
                    <div className="carousel-item rounded-2xl">
                        {loading && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 2,
                                    color: 'white',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    textShadow: '5px 5px 20px black',
                                }}
                            >
                                <img src={assets.videoPng} width='350px' alt="Loading animation"/>
                            </div>
                        )}

                            <img
                                className="d-block w-100 rounded-2xl"
                                src="https://optim.tildacdn.com/tild3238-3632-4136-a661-333964336132/-/resize/500x400/-/format/webp/c5EzUvDt_1Q-2.jpg"
                                alt="Second slide"
                                onLoad={handleImageLoad}
                            />

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: '0',
                                zIndex: '2',
                            }}
                            className="justify-center flex align-center"
                        >
                            <h5 className="text-7xl font-bold text-white" style={{ textShadow: '5px 5px 20px black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Учись
                            </h5>
                        </div>
                    </div>
                    <div className="carousel-item rounded-2xl">
                        {loading && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 2,
                                    color: 'white',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    textShadow: '5px 5px 20px black',
                                }}
                            >
                                <img src={assets.videoPng} width='350px' alt="Loading animation"/>
                            </div>
                        )}

                        <img
                            className="d-block w-100 rounded-2xl"
                            src="https://optim.tildacdn.com/tild6532-6362-4034-b530-616130386535/-/resize/500x400/-/format/webp/vvTTnsbHoLM-2.jpg"
                            alt="Third slide"
                            onLoad={handleImageLoad}
                        />

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: '0',
                                zIndex: '2',
                            }}
                            className="justify-center flex align-center"
                        >
                            <h5 className="text-7xl font-bold text-white" style={{ textShadow: '5px 5px 20px black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Пробуй
                            </h5>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    );
};

export default Hero;

