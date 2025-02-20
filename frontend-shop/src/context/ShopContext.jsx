import {createContext, useEffect, useState} from "react";

import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";



export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = 'р'
    const delivery_fee = 440
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [inCart, setInCart] = useState(false)
    const [retOption, setRetOption] = useState(null)
    const [products, setProducts] = useState([])
    let [proceedBtn, setProceedBtn] = useState(false)
    const [userData, setUserData] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '' )
    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])
    const addToCart = async (itemId,size) => {


        let cartData = structuredClone(cartItems);

                if (cartData[itemId]) {

                    if (cartData[itemId][size]) {
                        cartData[itemId][size] += 1
                    } else {
                        cartData[itemId][size] = 1
                    }
                }else {
                    cartData[itemId] = {}
                    cartData[itemId][size] = 1
                }



        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
                if (response.data.success) {
                    toast("Продукт добавлен в корзину!", {
                        position: "top-center",
                        autoClose: 2000,
                        style: { backgroundColor: "black", color: 'white' },
                    });
                }
                console.log(cartData); // Проверьте обновленные данные корзины
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        } else {
            toast.error("Для добавления в корзину необходимо войти в систему");
        }
    };





    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    // GET UPDATED PROFILE DATA
    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers: {token}})

            if (data.success) {
                setUserData(data.userData)
            } else {

                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {

            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]

                    }


                }catch (err) {
                    toast.error('Не удалось добавить продукт в корзину %(', err.message)
                }

            }
        }
        return totalCount
    }


    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity // modified amount of products

        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, quantity} , {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    function getCartAmount() { // getting overral amount of products in cart
        let totalAmount = 0
        for (const items in cartItems) { // getting on item
            let itemInfo = products.find((product) => {
                return product._id === items
            })
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) { // quantity of products in cart more than zero
                        // getting total fee sum of product
                        totalAmount += itemInfo.price * cartItems[items][item]

                    }
                }
                catch (error) {
                    toast.error('we unable to deduct total fee of products', error.message)
                }
            }
        }
        return totalAmount
    }
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
                console.log(response.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        getProductsData()
    },[])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const [reviews, setReviews] = useState([])
    const handleReviewAdded = (newReview) => {
        setReviews((prevReviews) => [newReview, ...prevReviews ]);
        localStorage.setItem('review', JSON.stringify(reviews.length))

    };

    const value = {
      cartItems, addToCart, inCart, setInCart, retOption, setRetOption,  currency,
        delivery_fee, products, showModal, setShowModal, getCartCount,
        updateQuantity, getCartAmount, proceedBtn, setProceedBtn, navigate,
        backendUrl, token, setToken, setCartItems, handleReviewAdded, reviews,
        loadUserProfileData, userData, setUserData
    }





    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider