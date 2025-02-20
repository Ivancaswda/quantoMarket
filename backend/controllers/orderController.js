import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'


// Placing orders using Cash later Method

const placeOrder = async (request, response) => {
        try {
            const { userId, items, amount, address} = request.body
            const orderData = {
                userId,
                items,
                address,
                amount,
                paymentMethod: 'COD',
                payment: false,
                date: Date.now(),

            }
            const newOrder = new orderModel(orderData)
            await newOrder.save() // saving data in database

            await userModel.findByIdAndUpdate(userId, {cartData:{}})

            response.json({success:true, message: "Заказ сделан!"})



        } catch (error) {
            console.log(error)
            response.json({success:false, message: error.message})
        }
}

const allOrders = async (request, response) => {
    try {
        const orders = await orderModel.find({}) // astoring orders in one array for admin page

        response.json({success:true, orders})
    } catch (error) {
        response.json({success:false, message:error.message})
    }

}


// user order data for frontEnd

const userOrders = async (request, response) => {
    try {
        const {userId} = request.body
        const orders = await orderModel.find({ userId })
        response.json({success:true, orders})

    } catch (error) {
        console.log(error.message)
        response.json({success:false, message:error.message})
    }
}

// update order status

const updateStatus = async (request, response) => {
        // creating function for updating stage of delivery in admin page after user make the order

    try {
        const {orderId, status} = request.body // getting stage of order and id of it

        await orderModel.findByIdAndUpdate(orderId, {status}) // changing it when choosing value
        response.json({success:true, message:'Стадия доставки изменена!'})
    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})

    }
}
// remove order
const removeOrder = async (request, response) => {
    try {
        const {orderId} = request.body
        await orderModel.findByIdAndDelete(orderId) // deleting product via id of it
        response.json({success: true, message: 'Заказ удален'})

    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})
    }
}
export {placeOrder, allOrders, userOrders, updateStatus, removeOrder}