import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    if (!classId) return NextResponse.json({ error: "Class ID required" }, { status: 400 });

    // ক্লাসের তথ্য আনা (সেমিস্টার ও সেকশন বের করার জন্য)
    const classData = await db.collection("classes").findOne({ _id: new mongoose.Types.ObjectId(classId) });
    if (!classData) return NextResponse.json({ error: "Class not found" }, { status: 404 });

    // ওই সেমিস্টারের সব স্টুডেন্ট আনা
    const students = await db.collection("students").find({ semester: classData.semester }).toArray();

    return NextResponse.json({ success: true, classData, students });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
// ... আগের GET কোড ...

export async function POST(req: Request) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { classId, date, attendanceData } = await req.json();

    // কুকি থেকে শিক্ষকের আইডি বের করা
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.verify(token!, process.env.JWT_SECRET || "secret_key_123") as { id: string };

    // একটি সিঙ্গেল ডকুমেন্টে হাজিরার ডাটা সেভ করা (বা আলাদা আলাদা)
    // এখানে আমরা প্রতিটি স্টুডেন্টের জন্য আলাদা রেকর্ড রাখছি
    const records = attendanceData.map((item: any) => ({
      classId: new mongoose.Types.ObjectId(classId),
      teacherId: new mongoose.Types.ObjectId(decoded.id),
      studentId: new mongoose.Types.ObjectId(item.studentId),
      date,
      status: item.status,
      createdAt: new Date(),
    }));

    await db.collection("attendance").insertMany(records);

    return NextResponse.json({ success: true, message: "Attendance saved" }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}