const mysql = require('../models/mysqlconnection.js');
const Q = require('q');

exports.getParkingSlots = (req,res) =>{
    mysql.query("SELECT * FROM parkingslots",[],(err,data)=>{
        res.json({data})
    })
}

exports.getParkingSlotsForFloor = (req,res) =>{
    let floor = req.body.floor
    let startedat = new Date().getTime();
    console.log("startedat",startedat)
    mysql.query("SELECT * FROM parkingslots where floor = ?",[floor],(err,data)=>{
        res.json({data})
    })
}


exports.createParking = (req,res) =>{
    let allPromises = [];

    let parking = {
        vehcicleno : req.body.vehicleno,
        vehicletype :req.body.vehicletype,
        parkingstartedat : new Date().getTime(),
        parkingfloor : req.body.parkingfloor,
        parkingtype : req.body.parkingtype
    }

    // Check for Empty slots

    mysql.query("SELECT * From parkingslots where parkingtype = ? ",[parking.parkingtype],(err,data)=>{
        console.log(data)
    })

    // let p1 = Q.defer();
    // mysql.query("INSERT INTO parkings (vehicleno,vehicletype,parkingstartedat,parkingfloor,parkingtype)",
    // [parking.vehcicleno,parking.vehicletype,parking.parkingstartedat,parking.parkingfloor,parking.parkingtype],p1.makeNodeResolver());
    // allPromises.push(p1.promise);

    // Q.allSettled(allPromises).then(function(Data){
    //     res.json(Data)
    // })
}