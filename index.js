require('dotenv').config({path: './config/env.js'}); 
const express = require('express');
const app = express();
const port = process.env.PORT; 

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });