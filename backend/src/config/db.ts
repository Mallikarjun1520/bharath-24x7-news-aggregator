import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/bharath247';
        await mongoose.connect(mongoURI);
        console.log('✓ MongoDB connection SUCCESS');
        return true;
    } catch (error) {
        console.warn('⚠ MongoDB connection FAILED - Server running with mock data only');
        console.warn('Error:', error instanceof Error ? error.message : String(error));
        // Don't exit - allow server to run with mock data
        return false;
    }
};

export default connectDB;
