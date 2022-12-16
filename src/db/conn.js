const mongoose = require('mongoose');
mongoose.connect(process.env.DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(()=>console.log("Connected to db"))
.catch(e=>console.log(e))