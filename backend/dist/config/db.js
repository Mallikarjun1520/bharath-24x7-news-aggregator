"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MONGO_URI not found");
        }
        await mongoose_1.default.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            family: 4, // force IPv4 (VERY IMPORTANT for your case)
        });
        console.log('✓ MongoDB connection SUCCESS');
        return true;
    }
    catch (error) {
        console.warn('⚠ MongoDB connection FAILED - Server running with mock data only');
        console.warn('Error:', error instanceof Error ? error.message : String(error));
        return false;
    }
};
exports.default = connectDB;
