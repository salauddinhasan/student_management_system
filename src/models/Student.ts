import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  userId: mongoose.Types.ObjectId;
  roll: string;
  semester: string;
  department: string;
  phone?: string;
  guardianPhone?: string;
  status: "Active" | "Inactive";
}

const StudentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  roll: { type: String, required: true, unique: true },
  semester: { type: String, required: true },
  department: { type: String, required: true, default: "CSE" },
  phone: { type: String },
  guardianPhone: { type: String },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
export default Student;