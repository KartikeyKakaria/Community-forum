const mongoose = require('mongoose');
const strType = {
    type: String,
    required: true,
}
const intType = {
    type: Number,
    default: 0,
}
const questionSchema = new mongoose.Schema({
    title: strType,
    description: strType,
    user: strType,
    topic: strType,
    upVotes: intType,
    downVotes: intType,
    answers: intType,
    date:{
        type:Date,
        default: new Date()
    }
})

const question = new mongoose.model("question", questionSchema)
module.exports = question;