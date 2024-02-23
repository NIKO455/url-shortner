const express = require('express');
const app = express();
require('donenv').config();
const databaseURL = process.env.DATABASE_URL
const PORT = process.env.PORT || 8080;

const {dbConnection} = require('./connection')
const urlRouter = require('./routers/url')
const path = require('path')

dbConnection(databaseURL)

// set the view engine to ejs
app.set('view engine', 'ejs')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.set('views', path.resolve("./views"));
app.use('/', urlRouter);


app.listen(PORT, () => {
    console.log(`Server has started 😂 ${PORT}`);
})