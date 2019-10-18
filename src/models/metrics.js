import mongoose from "mongoose";
const { Schema } = mongoose;

const metricSchema = new Schema({
  ip: String,
  country: String,
  city: String,
  device: String,
  browser: String,
  visit_month: String,
  visit_year: String
});

export default mongoose.model("Metric", metricSchema);
