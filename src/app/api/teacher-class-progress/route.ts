import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    if (!classId) return NextResponse.json({ error: "Class ID required" }, { status: 400 });

    // ১. ক্লাসের তথ্য আনা
    const classData = await db.collection("classes").findOne({ _id: new mongoose.Types.ObjectId(classId) });
    if (!classData) return NextResponse.json({ error: "Class not found" }, { status: 404 });

    // ২. ওই সেমিস্টারের স্টুডেন্টদের আনা
    const students = await db.collection("students").find({ semester: classData.semester }).toArray();

    // ৩. প্রত্যেক স্টুডেন্টের হাজিরা ও মার্কস বের করা
    const progressData = await Promise.all(students.map(async (student) => {
      // হাজিরা
      const attendanceRecords = await db.collection("attendance").find({ 
        studentId: student._id,
        classId: classData._id 
      }).toArray();
      
      const totalClasses = attendanceRecords.length;
      const presentClasses = attendanceRecords.filter(a => a.status === "Present").length;
      const attendancePercentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;

      // মার্কস
      const marksRecords = await db.collection("marks").find({ 
        studentId: student._id,
        classId: classData._id 
      }).toArray();
      
      const totalMarks = marksRecords.reduce((sum, m) => sum + m.mark, 0);
      const avgMarks = marksRecords.length > 0 ? Math.round(totalMarks / marksRecords.length) : 0;

      return {
        _id: student._id,
        name: student.name,
        roll: student.roll,
        attendancePercentage,
        avgMarks,
        totalClasses
      };
    }));

    return NextResponse.json({ success: true, classData, progressData });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}