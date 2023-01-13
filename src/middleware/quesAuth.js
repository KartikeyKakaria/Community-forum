const QUESTION = require('../schema/question');
const authQues = async(req,res,next)=>{
    try{
        const question =await  QUESTION.find({_id:req.params.quesId});
        if (question.length < 1) {
            throw err;
        } else {
            req.question = question[0];
        }
    }catch(err){
        res.render('index');
    }
    next();
}
module.exports = authQues;