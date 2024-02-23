const express = require('express');
const app = express();
const PORT = 8080;

const {dbConnection} = require('./connection')
const urlRouter = require('./routers/url')
const path = require('path')

dbConnection('mongodb://localhost:27017/short-url')

// set the view engine to ejs
app.set('view engine', 'ejs')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// routes
app.set('views', path.resolve("./views"));
app.use('/', urlRouter);



app.listen(PORT, () => {
    console.log(`Server has started 😂 ${PORT}`);
})