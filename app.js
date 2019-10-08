const express = require('express');
const mongoose = require("mongoose");
const PORT = 7000 || process.env.PORT;

const mongoURI = "mongodb://localhost/urlshortner";

const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if (err) console.log(`Error`, err);
    console.log(`Connected to urlshortner DB`);
});

require('./models/UrlShorten')
const app = express();




app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});