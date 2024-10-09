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
    console.log("Post created");
    res.redirect("/");
  } catch (error) {
    return res.render("posts/addPost", { error: error.message });
  }
};

//GET/api/v1/posts/ (all)

const allPostsController = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = {};

    // If a category is provided, apply the filter to the query
    if (category && category !== "") {
      query = { category: new RegExp(category, "i") }; // Case-insensitive matching for category
    }

    // This will now correctly filter based on the query (category)
    const posts = await Post.find(query).sort({ createdAt: -1 });

    // console.log("Query:", query); // Check that the query contains the correct category filter
    // console.log("Fetched Posts:", posts); // Check if filtered posts are returned

    res.render("posts/posts", { posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET/api/v1/posts/:id  (details)

const onePostsController = async (req, res, next) => {
  try {
    const postID = req.params.id;

    // Find the post by its ID and populate the user and comments
    const post = await Post.findById(postID).populate("user"); // Populate user field

    if (!post) {
      return next(appError("Post not found", 404));
    }

    // Fetch related posts from the same category
    const relatedPosts = await Post.find({
      category: post.category,
      _id: { $ne: postID },
    }).limit(7);

    // Render the post details
    res.render("posts/postDetails", {
      post,
      relatedPosts,
      userAuth: req.session.userAuth,
      error: "", // Clear any error message if the post is found
    });
  } catch (error) {
    return next(appError("The post could not be found", 500));
  }
};

const deletePostsController = async (req, res, next) => {
  try {
    // find the post
    const postToDelete = await Post.findById(req.params.id);

    // check if the postToDelete was created by the logged in user
    if (postToDelete.user.toString() !== req.session.userAuth.toString()) {
      // because we are comparing to objects not strings, so we need to convert them to Strings
      return next(appError("You are not authorized to delete this post", 403));
    }

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

  try {
    // Find the post to edit
    const postToEdit = await Post.findById(req.params.id);

    // Check if the postToEdit was created by the logged-in user
    if (postToEdit.user.toString() !== req.session.userAuth.toString()) {
      return next(appError("You are not authorized to edit this post", 403));
    }

    // Prepare the updated post data
    const updateData = { title, description, category };

    // If the user uploaded a new image, use the Cloudinary URL
    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL for the uploaded image
    }

    // Update the post
    await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated post
    });

    // Redirect to the updated post's page or the list of posts
    res.redirect(`/api/v1/posts/`);
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
