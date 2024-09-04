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

    console.log(userID);

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
    const posts = await Post.find();
    res.json({
      status: "Success",
      data: posts,
    });
  } catch (error) {
    return next(appError(" The posts cannot be found"));
  }
};

//GET/api/v1/posts/:id

const onePostsController = async (req, res, next) => {
  try {
    // get the ID from the params

    const postID = req.params.id;

    //find the post

    const post = await Post.findById(postID);

    res.json({
      status: "Success",
      data: post,
    });
  } catch (error) {
    return next(appError(" The post could not be found"));
  }
};

const deletePostsController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post deleted",
    });
  } catch (error) {
    res.json(error);
  }
};

const editPostsController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post edited",
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  postPostController,
  allPostsController,
  onePostsController,
  deletePostsController,
  editPostsController,
};
