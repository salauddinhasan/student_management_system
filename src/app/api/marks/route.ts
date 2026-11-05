import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    // marks কালেকশন থেকে ডাটা এনে students এবং classes এর সাথে Join করা
    const marks = await db.collection("marks").aggregate([
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
        $sort: { createdAt: -1 } // নতুনগুলো আগে দেখাবে
      }
    ]).toArray();

    return NextResponse.json({ success: true, marks });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}