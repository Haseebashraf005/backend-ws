const express = require('express');
const { dbConnection } = require('./dbConnection');

const app = express();
app.use(express.json()); // For parsing application/json




app.get('/student-read', async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("student")
    let data = await studentCollection.find().toArray()
    let resObj = {
        status: 1,
        msg: "Data view ok",
        data
    }

    res.send(resObj);
});


app.post('/student-insert', async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("student")

    let { s_Name, s_Email } = req.body
    let obj = { s_Name, s_Email }


    // Check if email already exists
    let existingStudent = await studentCollection.findOne({ s_Email });
    console.log(existingStudent)

    if (existingStudent) {
        return res.send({
            status: 0,
            msg: "User Email already exists",
        });
    }

    let insertRes = await studentCollection.insertOne(obj)

    let resObj = {
        status: 1,
        msg: "Data Insert ok",
        insertRes
    }

    res.send(resObj);
});


// delete document logic
const { ObjectId } = require('mongodb');
app.post('/student-delete/:id', async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("student")
    let id = req.params.id
    let existingStudent = await studentCollection.deleteOne({ _id: new ObjectId(id) });




    console.log(existingStudent)


    res.send("deleted");
});

//update the document 

app.post('/student-update', async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("student");

    const { id, s_Name, s_Email } = req.body;
    let obj = { id, s_Name, s_Email }
    const updateResult = await studentCollection.updateOne(
       { _id: ObjectId.createFromHexString(id) },
        { $set: { s_Name, s_Email } }
    );

    console.log(updateResult)

    res.send(updateResult)
});



// Add this 404 handler - it must be after all other route definitions
app.use((req, res) => {
    res.send("page not found")
});


app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});