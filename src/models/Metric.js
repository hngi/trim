import mongoose from "mongoose";
const { Schema } = mongoose;

const metricSchema = new Schema({
  urlShortenId: { type: Schema.Types.ObjectId, ref: 'UrlShorten', required: true },
  ip: String,
  country: String,
  city: String,
  device: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Metric", metricSchema);
