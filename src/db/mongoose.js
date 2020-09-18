const mongoose = require('mongoose')
const MongoURI = require('../../config/keys').MongoURI

mongoose.connect(MongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>{
    console.log("mongo connected")
}).catch((err)=>{
    console.log(err+"dd")
})
