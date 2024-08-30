//POST/api/v1/posts/
const postPostController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post created",
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
