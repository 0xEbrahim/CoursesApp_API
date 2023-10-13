require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const PORT =  process.env.PORT;
const coursesRoutes = require('./routes/coursesRoute');
const userRoutes = require('./routes/userRoute')
const {
    notFound,
    globalErrorHandler
    } = require('./middlewares/errorsHandler')
require('./database/db')
// middlewares
app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/api/courses', coursesRoutes)
app.use('/api/users', userRoutes);
//Error Handling
app.all('*', notFound)
app.use(globalErrorHandler)

app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})


