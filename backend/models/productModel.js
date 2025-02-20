import mongoose from 'mongoose'
// creating schema construction in database for products

const productSchema = new mongoose.Schema({
    name: {type:String, required: true},
    description: { type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true}, // installing required image array of product
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    sizes: {type: Array, required:false},
    bestseller: {type: Boolean},
    date: {type: Number,  required: false},
    hashTags: {type: [String], required: false}
})
                                      // if it exists it will be used or be created
const productModel = mongoose.models.product || mongoose.model('product', productSchema)

export default productModel