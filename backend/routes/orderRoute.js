import express from 'express'
import {placeOrder, allOrders, userOrders, updateStatus, removeOrder} from "../controllers/orderController.js";
import {adminAuth} from "../middleware/adminAuth.js";
import {authUser} from "../middleware/userAuth.js";

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth, allOrders)

orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features of user
orderRouter.post('/place', authUser, placeOrder) // via cash

// user feature
orderRouter.post('/userorders', authUser, userOrders)

orderRouter.post('/remove',adminAuth, removeOrder)

export default orderRouter