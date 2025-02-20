import React, {useContext, useState} from 'react';

import {backendUrl} from '../../../administrator/src/App.jsx'
import {ShopContext} from "../context/ShopContext.jsx";
import {toast} from "react-toastify";

const AddReview = ({ productId, onReviewAdded }) => {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const {getDataFeedbacks} = useContext(ShopContext)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reviewData = { author, content, productId };

        try {
            const response = await fetch(backendUrl + '/api/reviews/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                const newReview = await response.json();
                onReviewAdded(newReview);  // Обновление списка отзывов
                console.log(newReview.length)
                console.log(newReview.id)
                localStorage.setItem('reviewAmount', JSON.stringify(newReview.id))
                setAuthor('');
                setContent('');
                toast.info('Отзыв был успешно оставлен!')
            } else {
                console.error('Ошибка при отправке отзыва');
            }
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
        }


    };

    return (
        <form className='flex-col flex gap-2 px-4 w-[450px] '  onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
                <div>

                    <label className='text-md font-semibold'  htmlFor="author">Ваше имя:</label>

                </div>
                <input placeholder='Укажите ваше имя' className='py-2 px-2 rounded-lg hover:border-blue-700'
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required={true}
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-md font-semibold' htmlFor="content">Отзыв:</label>
                <textarea className='border border-blue-700 p-2 hover:border-blue-700' placeholder='Напишите что думаете об этом товаре...'
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required={true}
                />
            </div>
            <button className='text-center mt-2 py-2 px-4 bg-blue-700  rounded-lg text-white font-semibold' type="submit">Отправить отзыв</button>
        </form>
    );
};

export default AddReview;