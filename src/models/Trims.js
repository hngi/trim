const mongoose = require("mongoose");
const { Schema } = mongoose;
const trimsSchema = new Schema({
    long_url: { type: String, required: true },
    clipped_url:  type: String ,
    urlCode: type: String ,
    created_by: type: String  ,
    createdAt: { type: Date, default: Date.now },
    click_count: type: Number ,
});

module.exports = Trims = mongoose.model("Trims", trimsSchema);