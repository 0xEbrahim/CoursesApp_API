const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const coursesRoutes = require('./routes/coursesRoute')

// middlewares
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/api/courses',coursesRoutes)


app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})


