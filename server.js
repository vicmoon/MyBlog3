const express = require("express");
const app = express();
require("./config/connectDB");

//middlewares

//routes

//error handle middlewares

//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on: ${PORT}`));
