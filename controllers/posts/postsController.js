const Post = require("../../model/posts/Post");
const User = require("../../model/users/User");

//POST/api/v1/posts/
const postPostController = async (req, res) => {
  const { title, description, category, user } = req.body;
  try {
    // find the user
    const userID = req.session.userAuth;
    const userFound = await User.findById(userID);

    //create the post

    const postCreated = await Post.create({
      title,
      description,
      category,
      // image,
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

const allPostsController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post list",
    });
  } catch (error) {
    res.json(error);
  }
};

//GET/api/v1/posts/:id

const onePostsController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post details",
    });
  } catch (error) {
    res.json(error);
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
