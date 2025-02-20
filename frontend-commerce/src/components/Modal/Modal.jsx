import ReactDom from "react-dom";
import './Modal.css'
import {useContext} from "react";
import {ShopContext} from "../../context/ShopContext.jsx";
export default function Modal(props) {
        const {children} = props
        let {showModal, setShowModal} = useContext(ShopContext)
        return ReactDom.createPortal(
            <div className='modal-container'>
                <button onClick={() => {
                        setShowModal(false)
                }}  className='modal-underlay'></button>
                <div className='modal-content  w-50 mr-auto ml-auto'>
                    {children}
                </div>
            </div>,

            document.getElementById('portal')
        )
}