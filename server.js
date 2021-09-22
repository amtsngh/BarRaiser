const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post("/",(req, res)=>{
    console.log("Server Running properly")
    res.json({'mssg':"Server Running properly"});
});

require("./parkingApp/routes/parking.routes.js")(app)

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("App is running at PORT!!", PORT)
})