import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    content: {type: String, required: true},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true }, // Привязка к продукту
    createdAt: { type: Date, default: Date.now } // Поле для сортировки по дате
})

const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema)

export default reviewModel