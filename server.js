// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const userRoutes = require('./routes/users/users');
const postRoutes = require('./routes/posts/posts');
const commentRoutes = require('./routes/comments/comments');
const booksRoutes = require('./routes/resources/books');
const signUpsRoutes = require('./routes/newsletter/signups');
const paintingRoutes = require('./routes/paintings/painting');
const libraryRoutes = require('./routes/library/library');
const globalErrHandler = require('./middlewares/globalErrorHandling');
const Post = require('./model/posts/Post');
const { truncatePost } = require('./utils/helpers');
const path = require('path');
require('./config/connectDB');

const app = express();

// Set the views directory explicitly using an absolute path
app.set('views', path.join(__dirname, '/views'));
//to serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Set the view engine (e.g., EJS, Pug, Handlebars, etc.)
app.set('view engine', 'ejs'); // Assuming you're using EJS, change if needed.

// helpers
app.locals.truncatePost = truncatePost;

//middlewares
app.use(express.json());
// configure ejs
app.set('view engine', 'ejs');
// to parse the data from req.body
app.use(bodyParser.urlencoded({ extended: true }));

// method override
app.use(methodOverride('_method'));

//session config gives access to the req.session in each route
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60, // saves the user session for 1 day
    }),
  })
);

// Save the logged-in user into locals
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

// Render homepage
app.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(4);
    res.render('home', { posts });
  } catch (error) {
    res.render('home', { error: error });
  }
});

// Render contact page
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Render signup success
app.get('/signup_success', (req, res) => {
  res.render('signup_success');
});

app.get('/paintings', (req, res) => {
  res.render('paintings');
});

// ROUTES
// User Routes
app.use('/api/v1/users', userRoutes);

// Post Routes
app.use('/api/v1/posts', postRoutes);

// Comment Routes
app.use('/api/v1/comments', commentRoutes);

// Resources Routes
app.use('/api/v1/resources', booksRoutes);

// Signups Routes
app.use('/api/v1/signup', signUpsRoutes);

// Paintings Routes
app.use('/api/v1/paintings', paintingRoutes);

// Library Routes
app.use('/api/v1/library', libraryRoutes);

// Error handling middlewares
app.use(globalErrHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
