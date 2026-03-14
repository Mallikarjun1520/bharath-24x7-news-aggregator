import mongoose from 'mongoose';

const sourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String, // e.g. https://timesofindia.indiatimes.com
    },
    credibilityScore: {
        type: Number,
        default: 1.0, // 1.0 is neutral, higher is more credible, lower is less
    },
    category: {
        type: String,
    },
    language: {
        type: String,
        default: 'en',
    },
    country: {
        type: String,
        default: 'in',
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const Source = mongoose.model('Source', sourceSchema);
export default Source;
