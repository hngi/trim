const mongoose = require("mongoose");
const { Schema } = mongoose;
const trimsSchema = new Schema({
    long_url: { type: String, required: true },
    clipped_url:  String ,
    urlCode:  String ,
    created_by:  String  ,
    createdAt: { type: Date, default: Date.now },
    click_count: Number ,
});

module.exports = Trims = mongoose.model("Trims", trimsSchema);