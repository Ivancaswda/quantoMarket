import React, {useEffect, useState} from 'react'
import {assets} from "../assets/admin_assets/assets.js";
import axios from "axios";
import {backendUrl} from "../App.jsx";
import {toast} from "react-toastify";
const AddProduct = ({token}) => {
    const [categories, setCategories] = useState(["category 1", "category 2", "category 3"]);
    const [newCategory, setNewCategory] = useState("");
    const [hashTags, setHashTags] = useState([])
    const [hashTag, setHashTag] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    const addCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories([...categories, newCategory.trim()]);
            setNewCategory(""); // Очистка поля после добавления
        } else {
            toast.warn("Введите уникальную категорию");
        }
    };

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('category1')
    const [subCategory, setSubCategory] = useState('subcategory1')
    const [bestSeller, setBestSeller] = useState(false)
    const [sizes, setSizes] = useState([])
    const [loading, setLoading] = useState(false)
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData()

            if (description.length < 40) {
                toast.warn('Описание должно иметь хотя-бы 40 букв')
                return
            }

            formData.append("name", name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('subCategory', subCategory)
            formData.append('bestseller', bestSeller)
           formData.append('sizes', JSON.stringify(sizes))
            formData.append("hashTags", JSON.stringify(hashTags));

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + '/api/product/add', formData, {headers: {token}})

            console.log(response.data)


            if (response.data.success) {
                toast.success('Продукт был добавлен')
                setName('') // resetting properties after adding product
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
                setHashTags([]);
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }


    const getHashTag = async () => {
        try {
           const response = await axios.get(backendUrl + '/api/product/gethashtag')

           if (response.data.success) {
               setHashTags(response.data.hashtags)
               console.log(response.data.hashtags)
           }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const addHashTag = async () => {
        if (!hashTag.trim()) {
            toast.warn('Введите корректный хэштэг!');
            return;
        }
        if (hashTags.includes(hashTag.trim())) {
            toast.warn('Такой хэштэг уже существует!');
            return;
        }
        try {

            const response = await axios.post(
                backendUrl + '/api/product/createhashtag',
                { hashTag },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                toast.success('ХэшТэг был успешно добавлен!')
                setHashTags(prevState => [...prevState, hashTag])
                getHashTag()
                setHashTag('')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeHashTag = async (id) => {
        try {
            await axios.post(backendUrl + '/api/product/removehashtag', {id})
            toast.success('Хэштэг удалён!')
            getHashTag()
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getHashTag()
    }, [])

    return (
        <>
            {loading ?(<div className='grid place-items-center min-h-[80vh]'>
                <div
                    className='w-12 h-12 place-self-center border-4 border-gray-400 border-t-blue-700 rounded-full animate-spin '>

                </div>
            </div>) : (<form onSubmit={onSubmitHandler} className='flex flex-col w-full gap-3 items-start'>
                <div>
                    <p className='mb-2'>Загрузить изображение</p>

                    <div className='flex gap-2'>
                        <label htmlFor="image1">
                            <img className='w-20 rounded'
                                 src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=""/>
                            <input onChange={(event) => {
                                setImage1(event.target.files[0])
                            }} type="file" id='image1' hidden/>
                        </label>

                        <label htmlFor="image2">
                            <img className='w-20 rounded'
                                 src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=""/>
                            <input onChange={(event) => {
                                setImage2(event.target.files[0])
                            }} type="file" id='image2' hidden/>
                        </label>

                        <label htmlFor="image3">
                            <img className='w-20 rounded'
                                 src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=""/>
                            <input onChange={(event) => {
                                setImage3(event.target.files[0])
                            }} type="file" id='image3' hidden/>
                        </label>

                        <label htmlFor="image4">
                            <img className='w-20 rounded'
                                 src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=""/>
                            <input onChange={(event) => {
                                setImage4(event.target.files[0])
                            }} type="file" id='image4' hidden/>
                        </label>
                    </div>
                </div>
                <div className={'w-full'}>
                    <p className={'mb-2'}>Имя продукта</p>
                    <input value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Имя продукта'
                           required={true}/>
                </div>

                <div className={'w-full'}>
                    <p className={'mb-2'}>Описание продукта</p>
                    <textarea value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Описание продукта'
                              required={true}/>
                </div>
                <div className='flex flex-col sm:flex-row gap-2 w-full  sm:gap-8'>

                    <div>
                        <p className='mb-2'>Категория продукта</p>
                        <select onChange={(event) => {
                            setCategory(event.target.value)
                        }} className='w-full px-3 py-2'>
                            <option value="category 1">category 1</option>
                            <option value="category 2">category 2</option>
                            <option value="category 3">category 3</option>
                        </select>
                    </div>


                    <div>
                        <p className='mb-2'>Цена продукта, ₽</p>
                        <input value={price} onChange={(event) => {
                            setPrice(event.target.value)
                        }} className={'w-full px-3 py-2 sm:w-[120px]'} required={true} type="Number" placeholder='25'/>
                    </div>
                </div>


                <div className='w-full block md:flex gap-2 items-end justify-space-between'>
                    <div>
                        <p className='mb-2'>Саб-категория продукта</p>
                        <div>

                            <select onChange={(event) => {
                                setSubCategory(event.target.value)
                            }} className='w-full px-3 py-2 '>

                                {hashTags.map((item, index) => (
                                    <option key={index} value={item.hashTag}>{item.hashTag}</option>
                                ))}
                            </select>
                        </div>

                    </div>


                    <div className="block sm:flex gap-2 mt-2   ">
                        <input
                            type="text"
                            className="px-3 py-2 border rounded "
                            placeholder="Новая категория"
                            value={hashTag}
                            onChange={(e) => setHashTag(e.target.value)}
                        />
                        <button onClick={addHashTag} type="button"
                                className="mt-2 sm:mt-0 px-4 py-2 bg-green-500 text-white rounded ">
                            Добавить
                        </button>
                    </div>
                </div>


                <div>


                    {/*
                    <p className='mb-2'>Product Sizes</p>

                    <div className='flex gap-3'>
                        <div onClick={() => {
                            setSizes(prevState => prevState.includes('S') ? prevState.filter(item => item !== 'S') : [...prevState, 'S'])
                        }}>
                            <p className={`${sizes.includes('S') ? 'bg-lightblue-100' : 'bg-slate-200'  }`}>S</p>

                        </div>
                        <div onClick={() => {
                            setSizes(prevState => prevState.includes('M') ? prevState.filter(item => item !== 'M') : [...prevState, 'M'])
                        }}>
                            <p className={`${sizes.includes('M') ? 'bg-lightblue-100' : 'bg-slate-200'}`}>M</p>
                        </div>
                        <div onClick={() => {
                            setSizes(prevState => prevState.includes('L') ? prevState.filter(item => item !== 'L') : [...prevState, 'L'])
                        }}>
                            <p className={`${sizes.includes('L') ? 'bg-lightblue-100' : 'bg-slate-200'}`}>L</p>
                        </div>

                    </div>
                        */}

                </div>
                <div className='flex gap-2 mt-2'>
                    <input value={bestSeller} onChange={() => setBestSeller(prev => !prev)} checked={bestSeller}
                           type="checkbox" id='bestseller'/>
                    <label className='text-sm' htmlFor='bestseller'> Добавить к `лучшим продавцам`</label>
                </div>

                <button type='submit'
                        className='w-28 py-2 mt-4 bg-blue-800 rounded-3xl text-sm font-semibold text-white'>Добавить
                </button>

            </form>)}

        </>

    )
}
export default AddProduct
