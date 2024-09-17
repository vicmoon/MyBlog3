require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const serverless = require("express-serverless-handler");

const userRoutes = require("../routes/users/users");
const postRoutes = require("../routes/posts/posts");
const commentRoutes = require("../routes/comments/comments");
const booksRoutes = require("../routes/resources/books");
const signUpsRoutes = require("../routes/newsletter/signups");
const paintingRoutes = require("../routes/paintings/painting");
const globalErrHandler = require("../middlewares/globalErrorHandling");
const Post = require("../model/posts/Post");
const { truncatePost } = require("../utils/helpers");

// Create the Express app
const app = express();

// Database connection
require("../config/connectDB");

// Helpers
app.locals.truncatePost = truncatePost;

// Middlewares
app.use(express.json());
app.set("view engine", "ejs"); // Configure EJS for templating
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files
app.use(methodOverride("_method")); // Support for PUT/DELETE requests

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60, // 1-day session
    }),
  })
);

// Save login user data into locals for templates
app.use((req, res, next) => {
  if (req.session.userAuth) {
    res.locals.userAuth = req.session.userAuth;
  } else {
    res.locals.userAuth = null;
  }
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

// Render homepage
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(3);
    res.render("home", { posts });
  } catch (error) {
    res.render("home", { error: error });
  }
});

// Render contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Render signup success page
app.get("/signup_success", (req, res) => {
  res.render("signup_success");
});

// Render paintings page
app.get("/paintings", (req, res) => {
  res.render("paintings");
});

// API Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/resources", booksRoutes);
app.use("/api/v1/signup", signUpsRoutes);
app.use("/api/v1/paintings", paintingRoutes);

// Global error handler middleware
app.use(globalErrHandler);

// Export the app as a serverless function
module.exports.handler = serverless(app);
