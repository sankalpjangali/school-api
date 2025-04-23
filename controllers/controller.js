const express=require("express")
const db=require("../connection")
async function listofschool(req,res){
    try{
    const latitude=parseFloat(req.query.latitude)
    const longitude=parseFloat(req.query.longitude)

    console.log(latitude)
    if(!latitude || !longitude){
        res.status(400).json({success:false,error:"you havent gave latitude or longitude"})
    }
    else if(latitude < -90 || latitude > 90){
        res.status(400).json({success:false,error:"invalid latitude"})
    }
    else if(longitude < -180 || longitude > 180){
        res.status(400).json({success:false,error:"invalid longitude"})
    }
    else{    
        console.log(latitude)
        const sql = `
        SELECT id, name, latitude, longitude,
            (
                6371 * ACOS(
                    COS(RADIANS(?)) * COS(RADIANS(latitude)) *
                    COS(RADIANS(longitude) - RADIANS(?)) +
                    SIN(RADIANS(?)) * SIN(RADIANS(latitude))
                )
            ) AS distance
            FROM school
            ORDER BY distance ASC
            LIMIT 50  
      `;
      console.log("executing query now")
      db.query(sql, [latitude,longitude,latitude], (err, results) => {
        if (err) throw err;
        console.log("query has been executed")
        res.status(200).json(results)
    });
    }
}
    catch (e){
        console.log(e)
        res.status(500).send("something went wrong at our end sorry for the trouble")
    }
}
async function addstudent(req,res) {
    try{
        const name=req.body.name
        const address=req.body.address
        const latitude=parseFloat(req.body.latitude)
        const longitude=parseFloat(req.body.longitude)
        console.log(latitude)
        if(name && address && latitude && longitude){
            if( name.length>150){
                res.status(400).json({success:false,eror:"you havent add name field perfectly"})
            }
            else if(address.length>250){
                res.status(400).json({success:false,eror:"length is too much"})
            }
            else if(latitude < -90 || latitude > 90){
                res.status(400).json({success:false,eror:"you are giving wrong latitude"})
                        }
            else if(longitude < -180 || longitude > 180){
                res.status(400).json({success:false,eror:"you are giving wrong longitude"})
            }
            else{
                db.query(
                    'SELECT * FROM school WHERE name = ? AND address = ?',
                    [name, address],
                    (err, results) => {
                      if (err) return res.status(500).json({ success: false, error: err.message });
                
                      if (results.length > 0) {
                        return res.status(409).json({ success: false, error: 'School already exists.' });
                      }
                      else{
                        const sql=`insert into school(name,address,latitude,longitude) values(?,?,?,?)`
                db.query(sql,[name,address,latitude,longitude],(err,results)=>{
                    if (err) throw err;
            console.log("query has been executed")
            res.status(201).json({ 
                success: true, 
                school: { id: results.insertId, name, address } 
              });
                })
                      }
                    })
                    
                    
                
            }
            
        }
        else{
            res.status(404).json({success:false,error:"you haven't gave complete information"})
        }
    }
    catch(e){
        console.log(e)
        res.status(500).send("something went wrong we are sorry about it")
    }
}
module.exports={
   listofschool,
   addstudent
}