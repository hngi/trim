const mongoose = require("mongoose");
const { Schema } = mongoose;
const urlShortenSchema = new Schema({
    long_url: { type: String, required: true },
    clipped_url: String,
    urlCode: String ,
    created_by: String ,
    createdAt: { type: Date, default: Date.now },
    click_count: Number,
});

module.exports = UrlShorten=mongoose.model("UrlShorten", urlShortenSchema);