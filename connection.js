const mongoose = require('mongoose');

async function dbConnection(url) {
    mongoose.connect(url).then(() => {
        console.log("Database is connected successfully.")
    }).catch((err) => {
        console.log("Failed to connect to database.")
    })
}

module.exports = {dbConnection}