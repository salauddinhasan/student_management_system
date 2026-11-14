import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Student ID" }, { status: 400 });
    }

    const studentObjectId = new mongoose.Types.ObjectId(id);

    // ১. স্টুডেন্টের বেসিক তথ্য
    const student = await db.collection("students").findOne({ _id: studentObjectId });
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // ২. স্টুডেন্টের হাজিরার ডাটা
    const attendanceRecords = await db.collection("attendance").find({ studentId: studentObjectId }).toArray();
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(a => a.status === "Present").length;
    const absentDays = totalDays - presentDays;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    // ৩. স্টুডেন্টের মার্কস
    const marksRecords = await db.collection("marks").aggregate([
      { $match: { studentId: studentObjectId } },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDetails"
        }
      },
      { $unwind: { path: "$classDetails", preserveNullAndEmptyArrays: true } }
    ]).toArray();

    return NextResponse.json({ 
      success: true, 
      student,
      attendance: {
        totalDays,
        presentDays,
        absentDays,
        percentage: attendancePercentage
      },
      marks: marksRecords
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}