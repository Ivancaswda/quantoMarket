// add products to user card
import userModel from "../models/userModel.js";

const addToCart = async (request, response) => {
    try {
        const { userId, itemId, size  } = request.body; // Получаем userId, itemId и quantity (по умолчанию 1)

        // Получаем данные пользователя
        const userData = await userModel.findById(userId);

        // Если корзина пустая, инициализируем ее
        let cartData = await userData.cartData;

        // Если товар уже в корзине, увеличиваем его количество

            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1
                } else {
                    cartData[itemId][size] = 1
                }
            } else {
            //    cartData[itemId] = {}
                cartData[itemId] = 1
            }


        // Обновляем корзину пользователя в базе данных
        await userModel.findByIdAndUpdate(userId, {cartData});

        // Отправляем успешный ответ
        response.json({ success: true, message: "Продукт добавлен в корзину"});
    } catch (error) {
        console.log(error);
        response.json({ success: false, message: error.message });
    }
};

const updateCart = async (request, response) => {
    try {
        const { userId, itemId, quantity, size } = request.body;

        const userData = await userModel.findById(userId);

        let cartData = await userData.cartData

       // cartData[itemId][size] = quantity
        cartData[itemId].quantity = quantity
        await userModel.findByIdAndUpdate(userId, { cartData });

        response.json({ success: true, message: "Корзина обновлена!" });
    } catch (error) {
        console.log(error);
        response.json({ success: false, message: error.message });
    }
};

// get user card data
const getUserCart = async (request, response) => {
    try {
        const {userId} = request.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        response.json({success: true, cartData})
    } catch (error) {
        response.json({success: false, message: error.message})
    }
}
export {addToCart, updateCart, getUserCart}

