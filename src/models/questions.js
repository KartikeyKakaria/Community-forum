const mongoose = require('mongoose');
const QuestionSchema =   new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    topicId:{
        type:Number,
        required:true
    }
})
const Question = new mongoose.model("question",QuestionSchema)
module.exports = Question;