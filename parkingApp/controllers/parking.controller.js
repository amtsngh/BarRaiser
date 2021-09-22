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
        parkingstartedat : new Date().getTime(),
        parkingtype : req.body.parkingtype,
        entrygateno :req.body.entrygateno
    }

    // Check for Empty slots

    mysql.query("SELECT * From parkingslots where parkingtype = ? and emptyslots > 0",[parking.parkingtype],(err,data)=>{
        if(!err && data.length>0){
            // res.json({mssg:data})
            let parkingslot =  data[0]
            let floor = parkingslot.floor;
            let totalslots = parkingslot.totalslots;
            let emptyslots = parkingslot.emptyslots;

            let updatedemptyslot = emptyslots - 1;
            let usedslot = totalslots - updatedemptyslot

            let p1 = Q.defer();
            mysql.query("INSERT INTO parkings(vehicleno,parkingstartedat,parkingfloor,parkingtype,entrygateno) values (?,?,?,?,?)",
            [parking.vehcicleno,parking.parkingstartedat,floor,parking.parkingtype,parking.entrygateno],p1.makeNodeResolver());
            allPromises.push(p1.promise);

            let p2 = Q.defer();
            mysql.query("UPDATE parkingslots SET emptyslots = ? and usedslots = ? where floor = ? and parkingtype =?",
            [updatedemptyslot,usedslot,floor,parking.parkingtype],p2.makeNodeResolver());
            allPromises.push(p2.promise);

            Q.allSettled(allPromises).then(function(Data){
                res.json({mssg:floor})
            })
        }else{
            res.json({mssg:"no parking lot present."})
        }
    })
}