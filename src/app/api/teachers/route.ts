import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// নতুন টিচার তৈরি (POST)
export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, designation, phone } = await req.json();

    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    // ইমেইল চেক
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ১. users কালেকশনে লগইন তথ্য সেভ করা
    const userResult = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "teacher",
      createdAt: new Date(),
    });

    // ২. teachers কালেকশনে বিস্তারিত তথ্য সেভ করা
    await db.collection("teachers").insertOne({
      userId: userResult.insertedId,
      designation,
      phone,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Teacher created successfully" }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// সব টিচারের লিস্ট আনা (GET)
export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    // users এবং teachers কালেকশন Join করা
    const teachers = await db.collection("users").aggregate([
      { $match: { role: "teacher" } },
      {
        $lookup: {
          from: "teachers",
          localField: "_id",
          foreignField: "userId",
          as: "teacherDetails"
        }
      },
      { $unwind: "$teacherDetails" }
    ]).toArray();

    return NextResponse.json({ success: true, teachers });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}