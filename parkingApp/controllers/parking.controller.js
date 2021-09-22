const mysql = require('../models/mysqlconnection.js');

exports.getParkingSlots = (req,res) =>{
    mysql.query("SELECT * FROM parkingslots",[],(err,data)=>{
        res.json({data})
    })
}

exports.getParkingSlotsForFloor = (req,res) =>{
    let floor = req.body.floor
    mysql.query("SELECT * FROM parkingslots where floor = ?",[],(err,data)=>{
        res.json({data})
    })
}