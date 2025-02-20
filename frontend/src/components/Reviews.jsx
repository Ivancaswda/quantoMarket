import React, {useContext, useEffect, useState} from 'react'

import {backendUrl} from "../../../administrator/src/App.jsx";

import {assets} from "../assets/assets.js";

const Reviews = ({productId}) => {

    const [reviews, setReviews] = useState([]);

      // Загружаем отзывы продукта ..
    useEffect(() => {

    fetch(backendUrl + `/api/reviews/get/?productId=${productId}`).then(response => response.json())
        .then(data => setReviews(data))
        .catch(error => console.error('Ошибка при загрузке отзывов:', error));
        console.log(reviews)
        const reviewsCount = reviews.filter(review => review.productId === productId).length;
        localStorage.setItem('reviewsCount', JSON.stringify(reviewsCount))
      }, [productId]);
    // Функция для добавления нового отзыва
    const addReview = (newReview) => {
        setReviews(prevReviews => [newReview, ...prevReviews]);  // Добавляем новый отзыв в начало списка
    };

    return (
        <div className=''>
            <h3 className='text-2xl mt-4 text-center font-semibold'>Отзывы</h3>
            {reviews.length > 0 ? (
                <ul className='p-4 flex items-start gap-2  overflow-x-auto'>
                    {reviews.map((review) => (
                        <li className='p-4 mb-4 rounded-xl h-[140px] w-[360px]  ' style={{boxShadow: '1px 1px 2px gray'}} key={review.id}>
                            <div className='flex items-center gap-2'>
                                <img src={assets.user} className='w-6' alt=""/>
                                <p><strong className='text-sm'>{review.author}</strong></p>
                            </div>
                            <p className={'text-sm text-gray-700 '}>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Отзывов пока нет.</p>
            )}
        </div>
    )
}
export default Reviews
