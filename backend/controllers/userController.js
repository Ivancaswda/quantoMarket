import userModel from "../models/userModel.js";
import validator from "validator";

import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'

const createToken = (id) => { // using any jwt_secret
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (request, response) => {
        try {
            const {email, password} = request.body

            const user = await userModel.findOne({email})

            if (!user) {
                return response.json({success: false, message: 'Пользователь не существует'})
            }
                // comparing now inputted and stored password it should match
            const isMatch = bcryptjs.compare(password, user.password)

            if (isMatch) {
                const token = createToken(user._id)

                response.json({success: true, token})
            } else {
                response.json({success: false, message: 'Неверный пароль!'})
            }

        } catch (error) {
            console.log(error)
            response.json({success:false, message:error.message})
        }
}



const registerUser = async (request, response) => {
      //  response.json({message: 'Register aPI working'}) // getting stable response

    try {
        const {name, email, password} = request.body

        // checking user already exists or not
        const exists = await userModel.findOne({email}) // if email already exists we logininng
        if (exists) {
            return response.json({success: false, message: 'Пользователь уже существует'})
        }

        if (!validator.isEmail(email)) {
            return response.json({success: false, message: 'Введите доступный email'})
        }

        if (password.length < 8) {
            return response.json({success:false, message: 'Введите сложный пароль'})
        }
        // we should conceal (encrypt) the password and astore it in database via bcrypt package

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()
        // generating token via user`s id
        const token = createToken(user._id)

        response.json({success: true, token})

    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})
    }

}
// getting token when sending post request to /api/user/register api


const adminLogin = async (request, response) => { // function to login the admin
    try {
        const {email, password} = request.body // введенные email and password from model
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) { // if data correlates thus letting him through
            const token = jwt.sign(email+password, process.env.JWT_SECRET) // sending this token admin user
            response.json({success: true, token})
        } else {
            response.json({success:false, message: 'Неверные данные'})
        }
    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})
    }
    // testing it in json inserting email and password in post request to /api/user/admin
}



// Api to get user profile data and later change it

const getProfile = async (request, response) => {
    try {
        const { userId } = request.body
        // finding userData via userModel`s id
        const userData = await userModel.findById(userId).select('-password')
        response.json({success:true, userData})
    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})
    }
}

// Api to update user profile
const updateProfile = async (request, response) => {
    try {

        const { userId, name, phone, address, gender, dob} = request.body // expected data to be able to change
        const imageFile = request.file

        if (!name || !phone || !gender ) {
            return response.json({success:false, message: 'Нету данных'})
        }
        // updating user data
        await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender})

        // updating img of user
        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image:imageURL})

        }

        response.json({success: true, message: 'Профиль был изменён!'})

    } catch (error) {
        console.log(error)
        response.json({success:false, message:error.message})
    }
}






export {loginUser, registerUser, adminLogin, getProfile, updateProfile}