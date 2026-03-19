"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sourceSchema = new mongoose_1.default.Schema({
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
const Source = mongoose_1.default.model('Source', sourceSchema);
exports.default = Source;
