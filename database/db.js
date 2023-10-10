const mongoose = require('mongoose')

const url = "mongodb+srv://root:root@learn-nodejs.6qijpbw.mongodb.net/Courses_API";

mongoose.connect(url)
.then(()=>{
    console.log("Successfully connected to database")
})
.catch((err)=>{
    console.log(err)
});

