let express = require("express")
let mongoose = require("mongoose");
const enquiryModel = require("./models/enquiry.model");
require("dotenv").config();

let app = express();
app.use(express.json())

// connect to mongodb using mongoes
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connect to data base.")
})

app.get("/api/enquiry", (req, res) => {
    res.send("express working") 
})

app.post("/api/enquiry-insert" , (req,res)=>{
    let {sName,sEmail,sPhone,sMessage} = req.body
    // obj = {sName,sEmail,sPhone,sMessage}

    let enquiry = new enquiryModel({
        name:sName,
        email:sEmail,
        phone:sPhone, 
        message:sMessage
    })
    enquiry.save().then(()=>{
        res.send({
            status:1,
            message:"data has been submitted"
        })
    }).catch((err)=>{
          res.send({
            status:0,
            message:"error while saving enquiry",
            err
        })
    })

})

app.listen(8000, () => {
    console.log("go to thr url http://localhost:8000")
})