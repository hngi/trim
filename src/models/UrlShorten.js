const mongoose = require("mongoose");
const { Schema } = mongoose;
const urlShortenSchema = new Schema({
    long_url: String,
    clipped_url: String,
    urlCode: String,
    created_by: String,
    createdAt: { type: Date, default: Date.now },
    click_count: Number,
});
mongoose.model("UrlShorten", urlShortenSchema);