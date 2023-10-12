require('dotenv').config()
const express = require('express');
const app = express();
const PORT =  process.env.PORT;
const coursesRoutes = require('./routes/coursesRoute')
require('./database/db')

// middlewares
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/api/courses',coursesRoutes)


app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})


