require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const userRoutes = require("./routes/users/users");
const postRoutes = require("./routes/posts/posts");
const commentRoutes = require("./routes/comments/comments");
const booksRoutes = require("./routes/resources/books");
const signUpsRoutes = require("./routes/newsletter/signups");
const paintingRoutes = require("./routes/paintings/painting");
const globalErrHandler = require("./middlewares/globalErrorHandling");
const Post = require("./model/posts/Post");
const { truncatePost } = require("./utils/helpers");
const app = express();

require("./config/connectDB");

//helpers
app.locals.truncatePost = truncatePost;

//middlewares
app.use(express.json());
// configure ejs
app.set("view engine", "ejs");
// to parse the data from req.body
app.use(bodyParser.urlencoded({ extended: true }));
//to service static files
app.use(express.static(__dirname + "/public"));

// meth0d override
app.use(methodOverride("_method"));
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

// save the login user into locals

app.use((req, res, next) => {
  if (req.session.userAuth) {
    res.locals.userAuth = req.session.userAuth;
  } else {
    res.locals.userAuth = null;
  }
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

// RENDER

//render homepage
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(3);
    res.render("home", { posts });
  } catch (error) {
    res.render("home", { error: error });
  }
});

//render contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// render signup succes
app.get("/signup_success", (req, res) => {
  res.render("signup_success");
});

app.get("/paintings", (req, res) => {
  res.render("paintings");
});

//ROUTES
// user Routes
app.use("/api/v1/users", userRoutes);

// post Routes
app.use("/api/v1/posts", postRoutes);

//comment Routes
app.use("/api/v1/comments", commentRoutes);

//resources Routes
app.use("/api/v1/resources", booksRoutes);

//signups Routes

app.use("/api/v1/signup", signUpsRoutes);

// paintings routes
app.use("/api/v1/paintings", paintingRoutes);

//error handle middlewares

app.use(globalErrHandler);

//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on: ${PORT}`));
