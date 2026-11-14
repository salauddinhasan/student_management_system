 import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

// ================= ১. নতুন স্টুডেন্ট তৈরি করা (POST) =================
export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, roll, semester, department } = await req.json();

    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    // সরাসরি স্টুডেন্ট কালেকশনে ডাটা সেভ করা (কোনো লগইন অ্যাকাউন্ট লাগবে না)
    await db.collection("students").insertOne({
      name,
      roll,
      semester,
      department: department || "CSE",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Student created successfully" }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// ================= ২. সব স্টুডেন্টের লিস্ট আনা (GET) =================
export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    // সরাসরি students কালেকশন থেকে ডাটা আনা
    const students = await db.collection("students").find({}).toArray();

    return NextResponse.json({ success: true, students });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}