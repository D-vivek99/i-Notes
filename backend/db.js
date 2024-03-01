const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/inotebook';

const connectToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log("Connection Successful");
    })
}

module.exports = connectToMongo;