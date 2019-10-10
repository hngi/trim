const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlShortenSchema = new Schema({
	long_url: { type: String, required: true },
	clipped_url: { type: String, required: true },
	urlCode: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	created_by: { type: Date, default: Date.now },
	click_count: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model("UrlShorten", urlShortenSchema);
