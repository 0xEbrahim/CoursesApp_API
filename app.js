require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const PORT =  process.env.PORT;
const coursesRoutes = require('./routes/coursesRoute');
const { ERROR } = require('./utils/httpStatusText');
require('./database/db')

// middlewares
app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/api/courses',coursesRoutes)

// global not found middleware
app.all('*', (req, res , next) => {
    res.status(404).json({status : ERROR, message : "this resource is not available."})
})

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status : error.statusText || ERROR , message : error.message, code :error.statusCode || 500 , data : null});
})
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})


