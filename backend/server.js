import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from './routes/cartRoute.js'
import orderRouter from "./routes/orderRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
// Конфиг
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()
//
app.use(express.json())
app.use(cors()) // бэкэнд будет с любого ip

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/reviews', reviewRouter)





app.get('/', (request, response) => {
    response.send('Api работает')
})

app.listen(port, () => console.log('Сервер начался на порте :', port))