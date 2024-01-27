import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import studentmodel from "./models/studentmodel.js";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.get("/student/search", async(req,res)=>{
  const {uid,sem1,sem2,cgpa} = req.body;
  if (!uid || !sem1 || !sem2 || !cgpa){
    return res.status(400).send({
      success:false,
      message:"Give all data"
    })
  }
  const newStudent = await studentmodel.findOne({uid});
  if (!newStudent){
    return res.status(200).send({
      success:true,
      message:"student doesn't exist"
    })
  }
  else{
    return res.status(400).send({
      success:false,
      message:"student exists"
    })
  }
})

app.post("/student/new", async(req,res)=>{
  const {uid,sem1,sem2,cgpa} = req.body;
  if (!uid || !sem1 || !sem2 || !cgpa){
    return res.status(400).send({
      success:false,
      message:"Give all data"
    })
  }
  const createdUser=await  studentmodel({uid, sem1, sem2,cgpa}).save();
  return res.status(200).send({
    success:true,
    message:"new student created"
  })
})

app.put("/student/update", async(req,res)=>{
  const {uid,sem1,sem2,cgpa} = req.body;
  if (!uid || !sem1 || !sem2 || !cgpa){
    return res.status(400).send({
      success:false,
      message:"Give all data"
    })
  }
  let newStudent = await studentmodel.findOne({uid});
  if (newStudent){
    newStudent.uid = uid;
    newStudent.sem1 = sem1;
    newStudent.sem2 = sem2;
    newStudent.cgpa = cgpa;
    await newStudent.save();
    return res.status(200).send({
      success:true,
      message:"student details updated"
    })
  }
  else{
    return res.status(400).send({
      success:false,
      message:"existing uid"
    })
  }
})

app.patch("/student/oneupdate", async(req,res)=>{
  const {uid,sem1,sem2,cgpa} = req.body;
  let newStudent = await studentmodel.findOne({uid});
  if (newStudent){
    if (uid) newStudent.uid = uid;
    if (sem1) newStudent.sem1 = sem1;
    if (sem2) newStudent.sem2 = sem2; 
    if (cgpa) newStudent.cgpa = cgpa;
    await newStudent.save();
    return res.status(200).send({
      success:true,
      message:"detail updated"
    })
  }
  else{
    return res.status(400).send({
      success:false,
      message:"existing uid"
    })
  }
})

app.delete("/student/delete", async(req,res)=>{
  const {uid} = req.body;
  if (!uid){
    return res.status(400).send({
      success:false,
      message:"UID is required"
    })
  }
  const existingStudent = await studentmodel.findOne({uid});
  if (!existingStudent){
    return res.status(400).send({
      success:false,
      message:"Student not found"
    })
  }
  else{
    await studentmodel.deleteOne({uid});
    return res.status(200).send({
      success:true,
      message:"Student deleted"
    })
  }
})

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running onmode on port ${PORT}`.bgGreen.white);
});
