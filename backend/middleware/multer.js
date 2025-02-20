import multer from 'multer'
// via multer we`re uploading image and another information of product


const storage = multer.diskStorage({
    filename:function (request, file, callback) { // via this function we uploading image
        callback(null, file.originalname)
    }
})

const upload = multer({storage}) // taking this function and
// providing it to the route addProduct function

export default upload