import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    // attendance কালেকশন থেকে ডাটা এনে students, classes এবং teachers এর সাথে Join করা
    const attendance = await db.collection("attendance").aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "studentDetails"
        }
      },
      { $unwind: { path: "$studentDetails", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classDetails"
        }
      },
      { $unwind: { path: "$classDetails", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "teacherId",
          foreignField: "_id",
          as: "teacherDetails"
        }
      },
      { $unwind: { path: "$teacherDetails", preserveNullAndEmptyArrays: true } },
      {
        $sort: { date: -1, createdAt: -1 } // নতুন তারিখ আগে দেখাবে
      }
    ]).toArray();

    return NextResponse.json({ success: true, attendance });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}