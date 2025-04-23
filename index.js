const express=require("express")
const db=require("./connection")

const route=require("./routes/route")

app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// var data=await db.query("select * from school").then(
//     ()=>{
//         console.log("mysql connected")
//     }
// )
app.use("/",route)

app.listen(8000,()=>{
        console.log(`server is running on  http://127.0.0.1:8000/`)
    }
)