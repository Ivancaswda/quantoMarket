import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from "../context/ShopContext.jsx";
import {toast} from "react-toastify";
import axios from "axios";
const Profile = () => {


    // getting data for changing from api response database

    const { token, backendUrl, loadUserProfileData, userData, setUserData} = useContext(ShopContext)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    useEffect(() => {
        loadUserProfileData()
        console.log(userData)
    }, [token])
    const updateUserProfileData = async () => {
        // updating data here and saving
        try {

            const formData = new FormData()

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            // if image was uploaded it sends to form Data
            image && formData.append('image', image)

            const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}})

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }

    }



    return userData && (
        <div className={'max-w-lg flex flex-col gap-2 text-sm'}>

            {
                isEdit ? <label htmlFor="">
                    <div className='inline-block relative cursor-pointer'>
                        <img className='opacity-75 w-36 rounded' src={image ? URL.createObjectURL(image) : userData.image} alt=""/>
                        <img className='absolute w-10 bottom-12 right-12' src={image ? '' : userData.image}   alt=""/>
                    </div>
                    <input className='w-100' onChange={(e) => setImage(e.target.files[0])}  type="file" id='image'/>
                </label> : <img src={userData.image} className={'w-36 rounded'} alt=""/>
            }




            {
                isEdit ? <input className={'bg-gray-50 text-3xl font-medium max-w-60 mt-4'} value={userData.name} onChange={(e) => {
                    setUserData(prevData => ({...prevData, name: e.target.value
                    }))
                }} type="text"/> : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            }
            <hr className='bg-zinc-400 h-[1px] border-none'/>
            <div>
                <p className={'text-neutral-500 underline mt-3'}>КОНТАКТНАЯ ИНФОРМАЦИЯ</p>
                <div className='grid grid-cols-[1fr_3fr] mt-3 gap-y-2.5 text-neutral-700'>
                    <p className='font-medium'>EMAIL ID:</p>
                    { isEdit ?(
                        <input className='bg-gray-100 max-w-52' value={userData.email} onChange={(e) => {
                            setUserData(prevData => ({
                                ...prevData, email: e.target.value
                            }))
                        }} />
                    ) : (
                        <p className='text-blue-400'>{userData.email}</p>
                    )}

                    <p className='font-medium'>Телефон:</p>
                    {
                        isEdit ? <input className='bg-gray-100 max-w-52' value={userData.phone} onChange={(e) => {
                            setUserData(prevData => ({
                                    ...prevData, phone: e.target.value
                                })
                            )
                        }} type="text"/> : <p className='text-blue-400'>{userData.phone}</p>
                    }
                    <p className='font-medium'>Адрес:</p>
                    {
                        isEdit ?
                            <p>
                                <input className='bg-gray-50' value={userData.address.line1} onChange={(e) => {
                                    setUserData(prev => ({
                                            address: {...prev.address, line1: e.target.value}
                                        })
                                    )
                                }} type="text"/>
                                <br/>
                                <input className='text-gray-500' onChange={(e) => {
                                    setUserData(prev => ({
                                            address: {...prev.address, line1: e.target.value}
                                        })
                                    )
                                }} value={userData.address.line2} type="text"/>
                            </p>
                            : <p>
                                {userData.address.line1}
                                <br/>
                                {userData.address.line2}
                            </p>
                    }



                </div>
            </div>
            <div>
                <p className='text-neutral-500 underline mt-3'>ОБЫЧНАЯ ИНФОРМАЦИЯ</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='medium'>Пол:</p>

                    {isEdit ?
                        <select className='max-w-20 bg-gray-100' value={userData.gender} onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className={'text-gray-400'}>{userData.gender}</p>
                    }
                    <p>День рождения:</p>
                    {
                        isEdit ? <input onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} value={userData.dob} type="date"/>
                            : <p>{userData.dob}</p>
                    }
                </div>
            </div>
            <div className='mt-10'>
                {
                    isEdit ?
                        <button onClick={updateUserProfileData} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                               >Save information</button> : <button
                            className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                            onClick={() => {
                                setIsEdit(true)
                            }}>Edit</button>
                }
            </div>
        </div>


    )
}
export default Profile
