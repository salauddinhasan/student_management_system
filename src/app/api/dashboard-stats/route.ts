import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    // ডেটাবেস থেকে আসল সংখ্যা গোনা
    const totalStudents = await db.collection("students").countDocuments();
    const totalTeachers = await db.collection("users").countDocuments({ role: "teacher" });
    const totalClasses = await db.collection("classes").countDocuments();

    return NextResponse.json({ 
      success: true, 
      stats: { totalStudents, totalTeachers, totalClasses } 
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}