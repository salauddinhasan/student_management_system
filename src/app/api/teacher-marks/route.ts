import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// মার্কস ডাটা আনা (GET)
export async function GET(req: Request) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    if (!classId) return NextResponse.json({ error: "Class ID required" }, { status: 400 });

    const classData = await db.collection("classes").findOne({ _id: new mongoose.Types.ObjectId(classId) });
    if (!classData) return NextResponse.json({ error: "Class not found" }, { status: 404 });

    const students = await db.collection("students").find({ semester: classData.semester }).toArray();

    return NextResponse.json({ success: true, classData, students });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// মার্কস সেভ করা (POST)
export async function POST(req: Request) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { classId, examName, marksData } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.verify(token!, process.env.JWT_SECRET || "secret_key_123") as { id: string };

    // প্রতিটি স্টুডেন্টের মার্ক সেভ করা
    const records = marksData
      .filter((item: any) => item.mark !== "")
      .map((item: any) => ({
        classId: new mongoose.Types.ObjectId(classId),
        teacherId: new mongoose.Types.ObjectId(decoded.id),
        studentId: new mongoose.Types.ObjectId(item.studentId),
        examName,
        mark: Number(item.mark),
        createdAt: new Date(),
      }));

    if (records.length > 0) {
      await db.collection("marks").insertMany(records);
    }

    return NextResponse.json({ success: true, message: "Marks saved" }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}