import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb+srv://Student_db:CYPCB0wcQEpGJUgF@cluster0.ymdd1bt.mongodb.net/student_management?retryWrites=true&w=majority";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB...");

    const UserSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      role: { type: String, default: "admin" },
    });
    
    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    const existingAdmin = await User.findOne({ email: "admin@studentms.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("password123", 10);
    
    await User.create({
      name: "Super Admin",
      email: "admin@studentms.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully!");
    console.log("📧 Email: admin@studentms.com");
    console.log("🔑 Password: password123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seedAdmin();