import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { id } = await params;
    const teacherObjectId = new mongoose.Types.ObjectId(id);

    // ১. শিক্ষকের তথ্য
    const teacherData = await db.collection("users").aggregate([
      { $match: { _id: teacherObjectId, role: "teacher" } },
      {
        $lookup: {
          from: "teachers",
          localField: "_id",
          foreignField: "userId",
          as: "teacherDetails"
        }
      },
      { $unwind: { path: "$teacherDetails", preserveNullAndEmptyArrays: true } }
    ]).toArray();

    if (teacherData.length === 0) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    // ২. শিক্ষকের ক্লাসসমূহ
    const classes = await db.collection("classes").find({ teacherId: teacherObjectId }).toArray();

    return NextResponse.json({ success: true, teacher: teacherData[0], classes });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}