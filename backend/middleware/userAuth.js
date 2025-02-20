// authenticate the user when he placed the order or update cart or add in it
import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (request, response, next) => {

        const {token} = request.headers // we`re getting aToken only with smaller letter
        if (!token) {
            return response.json({success: false, message: 'Not authorized Login again'})
        }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        request.body.userId = token_decode.id
        next()

    } catch (err) {

        console.log(err)
        response.json({success:false, message:err.message})
    }
}
export {authUser}