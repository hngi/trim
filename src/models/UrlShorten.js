import mongoose from "mongoose";
const { Schema } = mongoose;

const UrlShortenSchema = new Schema({
  long_url: { type: String, required: true },
  clipped_url: { type: String, required: true },
  urlCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  created_by: { type: String, required: true },
  expiresBy: { type: Date }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }});

UrlShortenSchema.virtual('click_count', {
  ref: 'Click', // The model to use
  localField: '_id', // Find clicks where `localField`
  foreignField: 'urlShortenId', // is equal to `foreignField`
  count: true // And only get the number of docs
});

// populate the click_count property after every find query
UrlShortenSchema.post('find', async function (docs) {
  for (const doc of docs) {
    await doc.populate('click_count').execPopulate();
  }
});

export default mongoose.model("UrlShorten", UrlShortenSchema);
