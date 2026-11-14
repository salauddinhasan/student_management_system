import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key_123") as { id: string };
    const teacherId = new mongoose.Types.ObjectId(decoded.id);

    console.log("🔍 লগইন করা শিক্ষকের আইডি:", teacherId.toString());

    // এই শিক্ষকের সব ক্লাস খোঁজা
    const classes = await db.collection("classes").find({ teacherId }).toArray();
    
    console.log("📚 এই শিক্ষকের ক্লাস সংখ্যা:", classes.length);

    return NextResponse.json({ success: true, classes });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}