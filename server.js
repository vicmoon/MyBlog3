require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts/posts");
const commentRoutes = require("./routes/comments/comments");
require("./config/connectDB");

const app = express();

//middlewares
app.use(express.json()); //to pass in coming data

//ROUTES

// user Routes
app.use("/api/v1/users", userRoutes);

// post Routes
app.use("/api/v1/posts", postRoutes);

//comment Routes
app.use("/api/v1/comments", commentRoutes);

//error handle middlewares

//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on: ${PORT}`));
