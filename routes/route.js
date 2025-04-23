const express=require('express');
// const validateCoordinates=require("../middleware/middleware")
const app=express.Router()
const {listofschool,addstudent}=require("../controllers/controller")
app.get("/listSchools",listofschool)
app.post("/addSchool",addstudent)
module.exports=app