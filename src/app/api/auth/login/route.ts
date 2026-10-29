import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    console.log("1. Login attempt for:", email);

    // সরাসরি mongoose.collection দিয়ে ডাটা খোঁজা (যাতে স্কিমা এরর না আসে)
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      console.log("❌ User not found in DB!");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.log("2. User found:", user.email);
    console.log("3. Stored Hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("4. Password Match:", isMatch);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET || "secret_key_123",
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({ 
      success: true, 
      message: "Logged in successfully",
      user: { name: user.name, role: user.role }
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    console.error("❌ Error in login API:", errorMessage); // এরর টার্মিনালে দেখানোর জন্য
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}