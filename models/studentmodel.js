import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    uid: {
      type: Number,
      required: true,
      unique: true,
    },
    sem1: {
        type: Array,
        default: [],
    },
    sem2: {
        type: Array,
        default: [],
    },
    cgpa: {
        type: Number,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Students", studentSchema);
