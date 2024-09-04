require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoStore = require("connect-mongo");
const userRoutes = require("./routes/users/users");
const postRoutes = require("./routes/posts/posts");
const commentRoutes = require("./routes/comments/comments");
const globalErrHandler = require("./middlewares/globalErrorHandling");
const app = express();

require("./config/connectDB");

//middlewares

// configure ejs
app.set("view engine", "ejs");
// to parse the data from req.body
app.use(bodyParser.urlencoded({ extended: true }));
//to service static files
app.use(express.static(__dirname + "/public"));

//session config  gives access to the req.session in each route
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60, //  saves the user session for 1 day
    }),
  })
);

// RENDER

//render homepage
app.get("/", (req, res) => {
  res.render("home");
});

//ROUTES
// user Routes
app.use("/api/v1/users", userRoutes);

// post Routes
app.use("/api/v1/posts", postRoutes);

//comment Routes
app.use("/api/v1/comments", commentRoutes);

//error handle middlewares

app.use(globalErrHandler);

//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on: ${PORT}`));
