import mongoose from "mongoose";
const { Schema } = mongoose;

const UrlShortenSchema = new Schema({
  long_url: { type: String, required: true },
  clipped_url: { type: String, required: true },
  urlCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  created_by: { type: String, required: true },
<<<<<<< HEAD
  click_count: { type: Number, required: true, default: 0 },
  expiry_date: { type: Date }
=======
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

>>>>>>> ebd888b00f3b9f8ef19e270dbce44f391046f6a9
});

export default mongoose.model("UrlShorten", UrlShortenSchema);
