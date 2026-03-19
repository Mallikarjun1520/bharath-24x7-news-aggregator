import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI not found");
        }

        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            family: 4, // force IPv4 (VERY IMPORTANT for your case)
        });

        console.log('✓ MongoDB connection SUCCESS');
        return true;

    } catch (error) {
        console.warn('⚠ MongoDB connection FAILED - Server running with mock data only');
        console.warn('Error:', error instanceof Error ? error.message : String(error));
        return false;
    }
};

export default connectDB;