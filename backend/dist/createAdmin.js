"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bharath247';
// User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    interests: [{ type: String }],
    savedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
async function createAdmin() {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB connected");
        const adminEmail = "admin@bharath247.com";
        const adminPassword = "Admin@123456";
        const adminName = "Admin User";
        const existing = await User.findOne({ email: adminEmail });
        if (existing) {
            console.log("⚠️ Admin already exists");
            await mongoose.disconnect();
            process.exit(0);
        }
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            interests: []
        });
        console.log("\n🎉 Admin created successfully!");
        console.log("📧 Email:", adminEmail);
        console.log("🔑 Password:", adminPassword);
        await mongoose.disconnect();
        process.exit(0);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("❌ Error creating admin:", errorMessage);
        await mongoose.disconnect();
        process.exit(1);
    }
}
createAdmin();
