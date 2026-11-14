import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

// ================= ১. স্টুডেন্ট আপডেট করা (PUT) =================
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { id } = await params;
    const { name, roll, semester } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const result = await db.collection("students").updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { name, roll, semester } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Student updated successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// ================= ২. স্টুডেন্ট ডিলিট করা (DELETE) =================
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const result = await db.collection("students").deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Student deleted successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}