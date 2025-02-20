import jwt from 'jsonwebtoken'

// admin authentication middleware
// now we have to provide token which we get when admin signed in to be able to adding the products
const adminAuth = async (request, response, next) => {
    try {
        const {token} = request.headers // we getting Token only with smaller letter
        if (!token) {
            return response.json({success: false, message: 'Not authorized login again'})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return response.json({success: false, message: 'Not authorized login again'})
        }

        next()

    } catch (err) {

        console.log(err)
        response.json({success:false, message:err.message})
    }
}
export {adminAuth}