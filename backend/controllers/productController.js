
// functions to interact admin with products append them and list, remove

import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";
import hashtagModel from "../models/hashtagModel.js";
const addProduct = async (request, response) => {
    // via multer we`re uploading image and another information of product
    try {
        const { name, description, price, category, subCategory, sizes,  bestseller, hashTags} = request.body
        // getting images
        // if image which we`re sending in post request available therefore we send it
        const image1 = request.files.image1 && request.files.image1[0]

        const image2 = request.files.image2 && request.files.image2[0]

        const image3 = request.files.image3 && request.files.image3[0]

        const image4 = request.files.image4 && request.files.image4[0]




                                                           // удаляем те img которые не загружены
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // for adding images we should upload them in cloudinary and obtain the url which we`ll
        // use for storing image to product

        let imagesUrl = await Promise.all(
            images.map(async (item) => {                                                // path of image (value)
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url

            })
        )
        // all cloudinary url will be astored in imagesUrl

        const productData = {                    // we getting it in response as json-string
            name, description,
            category, subCategory,
            price: Number(price), bestseller: bestseller === "true" ,
            image: imagesUrl,
            sizes: JSON.parse(sizes),
            date: Date.now(),
            hashTags: JSON.parse(hashTags)
        }

        console.log(productData)

        const product = new productModel(productData) // in model we adding all data
        await product.save()

        response.json({success: true, message: "Product Added"})

        console.log(name, description, price, category, subCategory, sizes,  bestseller, hashTags)
        console.log(imagesUrl)

        response.json({})
        // checking sending api post request with name, desc and e.t.c and images of product
    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})
    }
}


const listProducts = async (request, response) => { // getting ALL products
        try {
            const products = await  productModel.find({}) // finding the products and sending get-request
            response.json({success: true, products})
        } catch (error) {
            console.log(error)
            response.json({success:false, message:error.message})
        }
}


const removeProducts = async (request, response) => {
    try {
        await productModel.findByIdAndDelete(request.body.id) // deleting product via id of it
        response.json({success: true, message: 'Продукт удален'})

    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})
    }
}


const singleProduct = async (request, response) => { // function to get single Product information
        try {
            const { productId } = request.body
            const product = await productModel.findById(productId)
            // находим продукт по айдишнику
            response.json({success:true,product})
        } catch (error) {
            console.log(error)
            response.json({success:false, message:error.message})
        }
}

const getHashTag = async (request, response) => {
        try {
           const hashtags = await hashtagModel.find({})
            response.json({success: true, hashtags})
        } catch (error) {
            console.log(error)
            response.json({success:false, message:error.message})
        }
}

const createHashtag = async (request, response) => {
    try {
        const {hashTag} = request.body

        const hashtag = new hashtagModel({hashTag})
        await hashtag.save()

        response.json({success:true, message: 'ХэшТэг создан!'})

    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})
    }
}
const removeHashtag = async (request, response) => {
    try {
        await hashtagModel.findByIdAndDelete(request.body.id)
        response.json({success: true, message: 'ХэшТэг удален'})
    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})
    }
}


export {addProduct, listProducts, removeProducts, singleProduct, createHashtag, getHashTag, removeHashtag}
