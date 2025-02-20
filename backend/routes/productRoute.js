import express from 'express'
import {
    addProduct,
    listProducts,
    singleProduct,
    removeProducts,
    createHashtag, getHashTag, removeHashtag
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import {adminAuth} from '../middleware/adminAuth.js'
const productRouter = express.Router()

// creating routes for function of admin
                                    // sending multiple images
 // now we have to provide token which we get when admin signed in to be able to adding the products
productRouter.post('/add', adminAuth, upload.fields([{name: 'image1', maxCount: 1},
    {name: 'image2', maxCount: 2},
    {name: 'image3', maxCount: 3},
    {name: 'image4', maxCount: 4}
    ]), addProduct)

productRouter.get('/list', listProducts)

productRouter.post('/single', singleProduct)

productRouter.post('/remove', removeProducts)

productRouter.get('/gethashtag', getHashTag)

productRouter.post('/createhashtag', createHashtag)

productRouter.post('/removehashtag', removeHashtag)

export default productRouter


