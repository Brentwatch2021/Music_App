const express = require('express');

const app = express();

const port = 5656;

app.get('/tools',(req,res) => {

    // Make DB call for tools

    res.send("Hoesit tools");
})

app.listen(port,() => console.log("We are live"));