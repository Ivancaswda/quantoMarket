import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {   // connecting cloudianry

    cloudinary.config({ // using private .env variable
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
}
export default connectCloudinary