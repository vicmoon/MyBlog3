//PUT/api/v1/comments/
const addCommentsController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment created",
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
