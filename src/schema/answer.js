const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    questionId:{
        type:String,
        required:true,
    },
    user:{
        type:String,
        required:true,
    },
    upVotes:{
        type:Number,
        default:0,
    },
    downVotes:{
        type:Number,
        default:0,
    },
    comments:{
        type:Number,
        default:0,
    }
})

const answer = mongoose.model("answer", answerSchema);
module.exports = answer;