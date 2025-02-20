import mongoose from 'mongoose'

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('Database подключено')
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/quantorium`)
}
export default connectDB