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

    const classData = await db.collection("classes").findOne({ _id: new mongoose.Types.ObjectId(classId) });
    if (!classData) return NextResponse.json({ error: "Class not found" }, { status: 404 });

    const students = await db.collection("students").find({ semester: classData.semester }).toArray();

    const progressData = await Promise.all(students.map(async (student) => {
      
      // ১. হাজিরা বের করা
      const attendanceRecords = await db.collection("attendance").find({ 
        studentId: student._id,
        classId: classData._id 
      }).toArray();
      
      const totalClasses = attendanceRecords.length;
      const presentClasses = attendanceRecords.filter(a => a.status === "Present").length;
      const attendancePercentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;

      // ২. মার্কস বের করা
      const marksRecords = await db.collection("marks").find({ 
        studentId: student._id,
        classId: classData._id 
      }).toArray();
      
      let totalMarks = 0;
      marksRecords.forEach((m) => {
        totalMarks += m.mark;
      });

      // এখানে ফিক্স করা হলো: Full Marks সবসময় ১১০ হবে
      const fullMarks = 110; 

      return {
        _id: student._id,
        name: student.name,
        roll: student.roll,
        attendancePercentage,
        totalMarks, // ছাত্র যা পেয়েছে (যেমন ১০৫)
        fullMarks,  // মোট নম্বর (সবসময় ১১০)
        totalClasses
      };
    }));

    return NextResponse.json({ success: true, classData, progressData });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}