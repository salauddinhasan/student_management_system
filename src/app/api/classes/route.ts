import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

// ================= ১. নতুন ক্লাস অ্যাসাইন করা (POST) =================
export async function POST(req: Request) {
  try {
    await connectDB();
    const { teacherId, subject, semester, section } = await req.json();

    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    await db.collection("classes").insertOne({
      teacherId: new mongoose.Types.ObjectId(teacherId),
      subject,
      semester,
      section,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Class assigned successfully" }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// ================= ২. সব ক্লাসের লিস্ট আনা (GET) =================
export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    // Classes কালেকশন থেকে ডাটা আনা এবং Teacher-এর নাম জয়েন করা
    const classes = await db.collection("classes").aggregate([
      {
        $lookup: {
          from: "users",
          localField: "teacherId",
          foreignField: "_id",
          as: "teacherDetails"
        }
      },
      { $unwind: { path: "$teacherDetails", preserveNullAndEmptyArrays: true } }
    ]).toArray();

    return NextResponse.json({ success: true, classes });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}