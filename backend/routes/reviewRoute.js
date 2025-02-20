import express from "express";
import {fetchAllReviews, getReviews, postReview, removeReview} from "../controllers/reviewController.js";




const reviewRouter = express.Router()

reviewRouter.get('/get', getReviews)
reviewRouter.get('/get-all', fetchAllReviews)
reviewRouter.post('/post', postReview)
reviewRouter.post('/remove', removeReview)

export default reviewRouter