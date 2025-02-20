import React, {useEffect, useState} from 'react'
import axios from "axios";
import {backendUrl} from "../App.jsx";
import {assets} from "../assets/admin_assets/assets.js";
import {toast} from "react-toastify";

const Reviews = ({token}) => {
    const [reviews, setReviews] = useState([]);
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(false);


    const getAllReviews = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${backendUrl}/api/reviews/get-all`);
            if (response.data.success) {
                setReviews(response.data.data);
                console.log(response.data.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    // Получаем информацию о продукте по ID
    const getProduct = async (id) => {
        if (!id || productData[id]) return; // Если уже загружен — не запрашиваем

        try {
            setLoading(true)
            const response = await axios.post(`${backendUrl}/api/product/single`, { productId: id });
            if (response.data.success) {
                setProductData(prev => ({
                    ...prev,
                    [id]: response.data.product
                }));
                console.log(response.data.product)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false)
        }
    };
    const removeReview = async (id) => {
        try {
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/reviews/remove', {id})
            getAllReviews()
            if (response.data.success) {
                toast.success(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    // Загружаем отзывы при монтировании
    useEffect(() => {
        getAllReviews();
    }, []);

    // Загружаем продукты, когда появились отзывы
    useEffect(() => {
      reviews.map((review) => getProduct(review.productId));
    }, [reviews]);

    return (
        <div>
            <p className="mb-2">Список отзывов</p>
            {loading ? (
                <div className='grid place-items-center min-h-[80vh]'>
                    <div
                        className='w-12 h-12 place-self-center border-4 border-gray-400 border-t-blue-700 rounded-full animate-spin '>

                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {/* Заголовки таблицы */}
                    <div
                        className="hidden  md:grid grid-cols-[1fr_1fr_1fr_3fr_1fr] items-center py-1 px-2 border bg-blue-100 text-sm">
                        <b className="text-center">Изображение</b>
                        <b className="text-center">Название</b>
                        <b className="text-center">Имя пользователя</b>
                        <b className="text-center">Отзыв</b>
                        <b className="text-center">Удалить</b>
                    </div>

                    {/* Список отзывов */}
                    {reviews.reverse().map((review, index) => {
                        const product = productData[review.productId]; // Берем данные о продукте

                        return (
                            <div
                                key={index}
                                className="grid grid-cols-[2fr] sm:grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_1fr_1fr_3fr_1fr] items-center gap-2 py-2 px-1 border-b text-center"
                            >
                                {/* Изображение продукта */}
                                <img
                                    className="rounded-lg"
                                    style={{width: '40px'}}
                                    src={product?.image?.[0] || assets.placeholder}
                                    alt={product?.name || 'Продукт'}
                                />

                                {/* Название продукта */}
                                <p>{product?.name || 'Загрузка...'}</p>

                                {/* Имя пользователя */}
                                <p>{review.author}</p>

                                {/* Отзыв */}
                                <p>{review.content}</p>

                                {/* Кнопка удаления */}
                                <img
                                    onClick={() => removeReview(review._id)}
                                    className="ml-auto mr-auto cursor-pointer"
                                    src={assets.cancel_icon}
                                    alt="Удалить"
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default Reviews
