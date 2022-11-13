const mongoose = require('mongoose');
const TopicSchema =   new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    }
})
const Topic = new mongoose.model("Topic",TopicSchema)
module.exports = Topic;