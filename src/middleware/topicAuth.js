const jwt = require("jsonwebtoken");
const TOPIC = require("../schema/topic");

const authTopic = async(req, res, next) => {
    try {
        const topic = await TOPIC.find({ name: req.params.name })
        if (topic.length < 1) {
            throw err;
        } else {
            req.topic = topic[0];
        }
    } catch (err) {
        res.render('index')
    }
    next();
}

module.exports = authTopic;