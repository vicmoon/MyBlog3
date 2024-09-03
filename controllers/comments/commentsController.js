const Comment = require("../../model/comments/Comment");
const Post = require("../../model/posts/Post");
const User = require("../../model/users/User");

//POST/api/v1/comments/
const addCommentsController = async (req, res) => {
  const { message } = req.body;

  try {
    //find the post

    const post = await Post.findById(req.params.id);

    // create a comment
    const comment = await Comment.create({
      user: req.session.userAuth,
      message,
    });

    // push the comment to post
    post.comments.push(comment._id);
    // find the user

    const user = await User.findById(req.session.userAuth);

    //push the comment auth

    user.comments.push(comment._id);
    //disable the validation ( so that mongoose does not think we want to save a post )
    //save
    await post.save({ validationBeforeSave: false });
    await user.save({ validationBeforeSave: false });

    res.json({
      status: "Success",
      data: comment,
    });
  } catch (error) {
    res.json(error);
  }
};

//GET/api/v1/comments/:id
const getCommentsController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment listed",
    });
  } catch (error) {
    res.json(error);
  }
};
//DELETE/api/v1/comments/:id
const deleteCommentsController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment deleted",
    });
  } catch (error) {
    res.json(error);
  }
};

//PUT/api/v1/comments/:id
const editCommentsController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment edited",
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  addCommentsController,
  getCommentsController,
  deleteCommentsController,
  editCommentsController,
};
