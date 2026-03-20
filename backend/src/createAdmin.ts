import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User"; // adjust if path differs

dotenv.config();

const createAdmin = async () => {
  try {
    // 🔌 Connect to DB
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    const email = "admin@bharat247.com";
    const password = "admin123";

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔍 Check if admin already exists
    const existing = await User.findOne({ email });

    if (existing) {
      console.log("⚠ Admin already exists");
      process.exit(0);
    }

    // 🧠 Create admin (WITH name FIX)
    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("🔥 Admin created successfully!");
    console.log("👉 Email: admin@bharat247.com");
    console.log("👉 Password: admin123");

    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();