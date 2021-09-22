module.exports = app =>{
    console.log("parking routes loaded")

    const parkingController = require("../controllers/parking.controller.js")

    app.post("/parking/getallparkingslots",parkingController.getParkingSlots);
    

};