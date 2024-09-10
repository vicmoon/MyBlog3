const Post = require("../../model/posts/Post");
const User = require("../../model/users/User");
const appError = require("../../utils/appError");

//POST/api/v1/posts/
const postPostController = async (req, res, next) => {
  const { title, description, category, image, user } = req.body;
  try {
    if (!title || !description || !category || !reg.file) {
      return next(appError("Missing details, all fields are required"));
    }
    // find the user
    const userID = req.session.userAuth;
    const userFound = await User.findById(userID);

    //create the post

    const postCreated = await Post.create({
      title,
      description,
      category,
      image: req.file.path,
      user: userFound._id,
    });

    // push the post in the array user's posts
    userFound.posts.push(postCreated._id);

    //save the user because we made changes

    await userFound.save();

    // console.log(userID);

    res.json({
      status: "Success",
      data: postCreated,
    });
  } catch (error) {
    res.json(error);
  }
};

//GET/api/v1/posts/ (all)

const allPostsController = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    // Render the home page with the fetched posts
    res.render("posts/posts", { posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET/api/v1/posts/:id

const onePostsController = async (req, res, next) => {
  try {
    // get the ID from the params

    const postID = req.params.id;

    //find the post

    const post = await Post.findById(postID).populate("comments");

    res.json({
      status: "Success",
      data: post,
    });
  } catch (error) {
    return next(appError(" The post could not be found"));
  }
};

const deletePostsController = async (req, res, next) => {
  try {
    // find the post
    const postToDelete = await Post.findById(req.params.id);

    //check if the postToDelete was created by the logged in user

    if (postToDelete.user.toString() !== req.session.userAuth.toString()) {
      // because we are comparing to objects not strings, so we need to convert them to Strings
      return next(appError("You are not authorized to delete this post", 403));
    }
    // delete post

    await Post.findById(req.params.id);

    res.json({
      status: "Success",
      data: "The post has been deleted",
    });
  } catch (error) {
    return next(
      appError("A problem occurred while deleting the post, try again")
    );
  }
};

const editPostsController = async (req, res, next) => {
  const { title, description, category } = req.body;
  // if (!title || !!description || !category) {
  //   return next(appError("All fields are required"));
  // }
  try {
    //find the post to edit
    const postToEdit = await Post.findById(req.params.id);

    //check if the postToEdit was created by the logged in user

    if (postToEdit.user.toString() !== req.session.userAuth.toString()) {
      // because we are comparing to objects not strings, so we need to convert them to Strings
      return next(appError("You are not authorized to edit this post", 403));
    }
    // edit the post
    const postEdited = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        image: req.path,
      },
      {
        new: true,
      }
    );

    res.json({
      status: "Success",
      data: postEdited,
    });
  } catch (error) {
    return next(
      appError("An error occurred while editing the post, try again")
    );
  }
};

module.exports = {
  postPostController,
  allPostsController,
  onePostsController,
  deletePostsController,
  editPostsController,
};
