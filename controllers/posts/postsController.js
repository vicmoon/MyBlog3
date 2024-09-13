const Post = require("../../model/posts/Post");
const User = require("../../model/users/User");
const appError = require("../../utils/appError");

//POST/api/v1/posts/
const postPostController = async (req, res, next) => {
  const { title, description, category, image } = req.body;
  try {
    if (!title || !description || !category || !req.file) {
      // return next(appError("Missing details, all fields are required"));
      return res.render("posts/addPost", { error: "All fields are required" });
    }
    // find the user
    // const userID = req.session.userAuth;
    // const userFound = await User.findById(userID);

    //create the post

    await Post.create({
      title,
      description,
      category,
      image: req.file.path,
      // user: userFound._id,
    });

    // // push the post in the array user's posts
    // userFound.posts.push(postCreated._id);

    // //save the user because we made changes
    // await userFound.save();
    res.redirect("/");
  } catch (error) {
    return res.render("posts/addPost", { error: error.message });
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
    // Get the ID of the current post from the request params
    const postID = req.params.id;

    // Find the current post by its ID, populate comments and user
    const post = await Post.findById(postID).populate("comments");

    if (!post) {
      return next(appError("Post not found"));
    }

    // Fetch other posts from the same category, excluding the current post
    const relatedPosts = await Post.find({
      category: post.category,
      _id: { $ne: postID }, // Exclude the current post from the results
    });

    // Render the post details and related posts
    res.render("posts/postDetails", {
      post, // The current post
      relatedPosts, // Posts from the same category
      error: "", // Optional error handling
    });
  } catch (error) {
    return next(appError("The post could not be found"));
  }
};

const deletePostsController = async (req, res, next) => {
  try {
    // // find the post
    // await Post.findById(req.params.id);

    // //check if the postToDelete was created by the logged in user
    // // if (postToDelete.user.toString() !== req.session.userAuth.toString()) {
    // //   // because we are comparing to objects not strings, so we need to convert them to Strings
    // //   return next(appError("You are not authorized to delete this post", 403));
    // // }

    // delete post

    await Post.findByIdAndDelete(req.params.id);
    // redirect
    res.redirect("/");
    // res.json({
    //   status: "Success",
    //   data: "The post has been deleted",
    // });
  } catch (error) {
    return next(
      appError(
        "A problem occurred while deleting the post, try again",
        error.message
      )
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
