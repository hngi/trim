import mongoose from "mongoose";
const { Schema } = mongoose;

const urlShortenSchema = new Schema({
	long_url: { type: String, required: true },
	clipped_url: { type: String, required: true },
	urlCode: { type: String, required: true },
	created_by: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	click_count: { type: Number, required: true }
});

export default mongoose.model("UrlShorten", urlShortenSchema);