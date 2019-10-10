import mongoose from "mongoose";
const { Schema } = mongoose;

const TrimSchema = new Schema({
	long_url: { type: String, required: true },
	urlCode: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	click_count: { type: Number, required: true }
});

export default mongoose.model("Trim", TrimSchema);