const mongoose = require('mongoose');
const QuestionSchema =   new mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    topicId:{
        type:Number,
        required:true
    }
})
const Question = new mongoose.model("question",QuestionSchema)
module.exports = Question;