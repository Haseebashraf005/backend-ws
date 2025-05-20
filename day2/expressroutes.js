const express = require('express');
const app = express();
app.use(express.json()); // For parsing application/json


app.get('/', (req, res) => {
    console.log('Default route hit');
    res.send('This is API from Express');
});

app.get('/contact', (req, res) => {
    console.log('Contact route hit');
    res.send('This is contact page');
});

app.get('/about', (req, res) => {
    console.log('About route hit');
    res.send('This is about page');
});

app.get('/news/:id', (req, res) => {
    let currentId = req.params.id;
    res.send("dynamic id is " + currentId)
});

app.post("/login",(req,res) => {
    // console.log(req.body)
    // res.send(req.body);
    // res.send(req.query);
    res.status(200).json(req.query)
    console.log(req.query);

})

// Add this 404 handler - it must be after all other route definitions
app.use((req, res) => {
    res.send("page not found")
});






app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});