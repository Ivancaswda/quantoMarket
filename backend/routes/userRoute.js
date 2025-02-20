import express from 'express'
import {registerUser, loginUser, adminLogin, getProfile, updateProfile} from "../controllers/userController.js";
import {authUser} from "../middleware/userAuth.js";
import upload from "../middleware/multer.js";

// creating router for link sources

const userRouter = express.Router()

userRouter.post('/register',  registerUser)

userRouter.post('/login',  loginUser)

userRouter.post('/admin',  adminLogin)

userRouter.get('/get-profile',authUser, getProfile)

userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
export default userRouter