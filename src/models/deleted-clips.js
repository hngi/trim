import mongoose from "mongoose";
const { Schema } = mongoose;

const deletedClipSchema = new Schema({
	clipped_url: { type: String, required: true },
	urlCode: { type: String, required: true },
	deletedAt: { type: Date, default: Date.now }
});

export default mongoose.model("DeletedClips", deletedClipSchema);