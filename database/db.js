const mongoose = require('mongoose')
const url = process.env.MONGO_URL;
mongoose.connect(url)
.then(()=>{
    console.log("Successfully connected to database")
})
.catch((err)=>{
    console.log(err)
});