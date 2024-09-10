const Painting = require("../../model/painting/Painting");

const uploadPaintingController = async (req, res, next) => {
  const { title, paintingImage } = req.body;
  try {
    const newPainting = new Painting.create({
      title,
      paintingImage: req.file.path,
    });
    console.log(newPainting);

    res.json({
      status: "Success",
      data: "You have updated the profile photo",
    });
  } catch (error) {
    // res.json(error);
    return next(appErr(error.message));
  }
};

module.exports = {
  uploadPaintingController,
};
