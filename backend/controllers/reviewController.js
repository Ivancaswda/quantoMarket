import {request} from "express";
import reviewModel from "../models/reviewModel.js";

let reviews = []

const getReviews = async (request, response) => {
    try {


        const { productId } = request.query;
        const reviews = await reviewModel.find({productId})
        response.json({success: true, reviews});
    } catch (error) {
        response.json({success:false, message: `Не удалось найти отзывы ${error.message}`})
    }
}


const postReview  = async (req, res) => {
    const { author, content, productId } = req.body;

    if (!author || !content || !productId) {
        return res.json({ success: false, message: "All fields are required" });
    }

    const newReview = new reviewModel({author, content, productId})
    await newReview.save()

    res.json({success:true, message: 'Review had been added!'});
}
const fetchAllReviews = async (request, response) => {
    const reviews = await reviewModel.find();
    response.json({ success: true, data: reviews });
}

const removeReview = async (request, response) => {
    try {
         await reviewModel.findByIdAndDelete(request.body.id)
          response.json({success:true, message: 'Отзыв удалён!'})
    } catch (error) {

            response.json({success:false, message: `Не удалось удалить отзыв!, ${error.message}`})
    }
}

export {getReviews, postReview, fetchAllReviews, removeReview}