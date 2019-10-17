import mongoose from 'mongoose';
const { Schema } = mongoose;

const ClickSchema = new Schema({
  urlShortenId: { type: Schema.Types.ObjectId, ref: 'UrlShorten', required: true },
  publicIp: { type: String, default: null },
  location: {
    country: { type: String, default: null },
    countryCode: { type: String, default: null }
  },
  deviceType: {
    type: String,
    enum: ['mobile', 'desktop', 'tablet', 'other'],
    default: 'other'
  }
});

export default mongoose.model('Click', ClickSchema);