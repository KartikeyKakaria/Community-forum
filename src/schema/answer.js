const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    questionId: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    upVotes: {
        type: Number,
        default: 0,
    },
    downVotes: {
        type: Number,
        default: 0,
    },
    comments: [{
        user: {
            type: String,
            required: false,
        },
        upVotes: {
            type: Number,
            default: 0,
        },
        downVotes: {
            type: Number,
            default: 0,
        },
        text: {
            type: String,
            required:true,
        },
        date: {
            type:Date,
            default: new Date(),
        }
    }],
    date: {
        type: Date,
        default: new Date(),
    }
})

// answerSchema.methods.addComment = async function(comment){
//     try{
//         this.comments = this.comments.concat(comment);
//         await this.save();
//         return true;
//     }catch(err){ return error; }
// }

const answer = new mongoose.model("answer", answerSchema);
module.exports = answer;