import mongoose from 'mongoose'

const hashtagSchema = new mongoose.Schema({
    hashTag: {type: String, required:true},
    date: {type: String, default: Date.now()}
})

const hashtagModel = mongoose.models.hashtag || mongoose.model('hashtag', hashtagSchema)

export default hashtagModel