import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Modal from "./components/Modal/Modal.jsx";
import NewsletterBox from "./components/NewsletterBox/NewsletterBox.jsx";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "./context/ShopContext.jsx";
import Collection from "./pages/Collection.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
function App() {
    let {showModal, setShowModal} = useContext(ShopContext)
    let [scrollPass, setScrollPass] = useState(false)

    useEffect(() => {
        // Define the scroll threshold
        const scrollThreshold = 2800;

        // Event handler for scroll event
        const handleScroll = () => {
            // Get the scroll position
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;

            // Check if the scroll position is greater than the threshold and if we haven't already shown the notification
            if (scrollPosition > scrollThreshold && !scrollPass) {
                setShowModal(true); // Show the notification
                setScrollPass(true); // Mark that we've shown the notification
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPass]);

    return (
    <div  >

        { showModal ? (<Modal>
            <NewsletterBox/>
        </Modal>
        ) : null}
        <div className='overflow-hidden mb-10 ' style={{width: '100%', maxWidth: '1200px', marginRight: 'auto', marginLeft: 'auto'}}>

        <ToastContainer/>
            <Header/>
         <Routes>
             <Route path='/' element={<Home/>}/>
             <Route path='/about' element={<About/>}/>
             <Route path='/collection' element={<Collection/>}/>
             <Route path='/login' element={<Login/>}/>

             <Route path='/product/:productId' element={<Product/>}/>
             <Route path='/cart' element={<Cart/>}/>
             <Route path='/contact' element={<Contact/>}/>
             <Route path='/place-order' element={<PlaceOrder/>}/>
             <Route path='/orders' element={<Orders/>}/>
             <Route path='/profile' element={<Profile/>}/>

         </Routes>

        </div>
        <Footer className='mt-8'/>
    </div>
  )
}

export default App
