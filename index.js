const express = require('express');

const app = express();
app.use(express.json()); // For parsing application/json




app.get('/student-read', (req, res) => {
    res.send('Student View api ');
});


app.post('/student-insert', (req, res) => {
    res.send('Student insert api ');
});



// Add this 404 handler - it must be after all other route definitions
app.use((req, res) => {
    res.send("page not found")
});

   
app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});