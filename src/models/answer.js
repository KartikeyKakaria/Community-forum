const mongoose = require("mongoose")
const answerSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    quesId:{
        type:String,
        required:true
    },
    upvotes:{
        type:Number,
        required:true
    },
    downvotes:{
        type:Number,
        required:true
    }
})
const Answer = new mongoose.model("Answer",answerSchema);
module.exports = Answer;