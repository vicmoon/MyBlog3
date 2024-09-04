const Comment = require("../../model/comments/Comment");
const Post = require("../../model/posts/Post");
const User = require("../../model/users/User");
const appError = require("../../utils/appError");

//POST/api/v1/comments/
const addCommentsController = async (req, res, next) => {
  const { message } = req.body; // what the user is sending to the server

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
    return next(appError("An error occurred:", error.message));
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
const deleteCommentsController = async (req, res, next) => {
  try {
    // find the comment
    const commentToDelete = await Comment.findById(req.params.id);

    //check if the commentToDelete was created by the logged in user

    if (commentToDelete.user.toString() !== req.session.userAuth.toString()) {
      // because we are comparing to objects not strings, so we need to convert them to Strings
      return next(
        appError("You are not authorized to delete this comment", 403)
      );
    }
    // delete comment

    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      status: "Success",
      data: "The comment has been deleted.",
    });
  } catch (error) {
    return next(
      appError("A problem occurred while deleting the comment, try again")
    );
  }
};

//PUT/api/v1/comments/:id
const editCommentsController = async (req, res, next) => {
  try {
    //find the comment to edit
    const commentToEdit = await Comment.findById(req.params.id);

    // if not comment found
    if (!commentEdited) {
      return next(appError("Comment was not found"));
    }

    //check if the commentToEdit was created by the logged in user

    if (commentToEdit.user.toString() !== req.session.userAuth.toString()) {
      // because we are comparing to objects not strings, so we need to convert them to Strings
      return next(appError("You are not authorized to edit this comment", 403));
    }
    // edit the post
    const commentEdited = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        message: req.body.message,
      },
      {
        new: true,
      }
    );

    res.json({
      status: "Success",
      data: commentEdited,
    });
  } catch (error) {
    return next(appError("An error occurred while editing the comment", error));
  }
};

module.exports = {
  addCommentsController,
  getCommentsController,
  deleteCommentsController,
  editCommentsController,
};
