const mongoose = require("mongoose");
const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        requiired: true,
    },
    definition: {
        type: String,
        required: true,
    },
    questions: {
        type: Number,
        default: 0,
    },
    imageName: {
        type: String,
        required: true,
    }
})
const topic = new mongoose.model("topic", topicSchema);
module.exports = topic;