const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    answerId:{
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
const Comment = new mongoose.model("Comment",commentSchema);
module.exports = Comment;