let express = require("express")
let mongoose = require("mongoose");
const enquiryModel = require("./models/enquiry.model");
require("dotenv").config();

let app = express();
app.use(express.json())

// connect to mongodb using mongoes
mongoose.connect(process.env.DBURL).then(() => {
    console.log("connect to data base..")
})

app.listen(8000, () => {
    console.log("go to thr url http://localhost:8000")
})

app.get("/api/enquiry", async (req, res) => {

    // res.send({
    //     status:1,
    //     msg:"data view ok"
    // }) 

    let enquiryList = await enquiryModel.find()

    res.status(200).json({
        status: 1,
        msg: "Enquiry list",
        data: enquiryList
    })
})

app.post("/api/enquiry-insert", (req, res) => {
    let { sName, sEmail, sPhone, sMessage } = req.body
    // obj = {sName,sEmail,sPhone,sMessage}

    let enquiry = new enquiryModel({
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    })
    enquiry.save().then(() => {
        res.send({
            status: 1,
            message: "data has been submitted"
        })
    }).catch((err) => {
        res.send({
            status: 0,
            message: "error while saving enquiry",
            err
        })
    })

})


app.delete("/api/enquiry-delete/:id", async (req, res) => {

    // enquiry.delete({ _id:})
    // console.log(req.params)
    let userId = req.params.id;
    
    let deleteResponse = await enquiryModel.deleteOne({_id:userId});
    console.log(deleteResponse)
    
    res.send({
        status:1,
        msg:"user has been delete",
        deleteResponse
    })

})

app.put("/api/enquiry-update", async (req, res) => {

let {id, sName, sEmail, sPhone, sMessage } = req.body

let updateRecord = {
        
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    }
    
    let updateResponse = await enquiryModel.updateOne({_id:id},{$set:updateRecord});
    res.send({
        status:1,
        msg:"user api",
        updateResponse
        
    })

})

