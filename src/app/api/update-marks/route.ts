import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

// নির্দিষ্ট স্টুডেন্টের সব মার্কস আনা
export async function GET(req: Request) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    const classId = searchParams.get("classId");

    if (!studentId || !classId) {
      return NextResponse.json({ error: "Missing studentId or classId" }, { status: 400 });
    }

    // ওই স্টুডেন্ট এবং ক্লাসের সব মার্কস খোঁজা
    const marksRecords = await db.collection("marks").find({
      studentId: new mongoose.Types.ObjectId(studentId),
      classId: new mongoose.Types.ObjectId(classId)
    }).toArray();

    const marksMap: any = { "Quiz 1": "", "Quiz 2": "", "Midterm": "", "Final": "" };
    marksRecords.forEach(m => { 
      marksMap[m.examName] = m.mark; 
    });

    return NextResponse.json({ success: true, marks: marksMap });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// মার্কস আপডেট করা
export async function PUT(req: Request) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { studentId, classId, marks } = await req.json();

    // আগের মার্কস ডিলিট
    await db.collection("marks").deleteMany({
      studentId: new mongoose.Types.ObjectId(studentId),
      classId: new mongoose.Types.ObjectId(classId)
    });

    // নতুন মার্কস সেভ
    const records: any[] = [];
    Object.keys(marks).forEach((examName) => {
      if (marks[examName] !== "" && marks[examName] !== undefined) {
        records.push({
          classId: new mongoose.Types.ObjectId(classId),
          studentId: new mongoose.Types.ObjectId(studentId),
          examName,
          mark: Number(marks[examName]),
          createdAt: new Date(),
        });
      }
    });

    if (records.length > 0) {
      await db.collection("marks").insertMany(records);
    }

    return NextResponse.json({ success: true, message: "Marks updated successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}