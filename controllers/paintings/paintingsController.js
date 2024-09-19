const Painting = require("../../model/painting/Painting");

const uploadPaintingController = async (req, res, next) => {
  const { title } = req.body; // no paintingImage in body, multer handles that

  try {
    const newPainting = await Painting.create({
      title,
      paintingImage: req.file.path, // req.file.path stores the uploaded image path
    });
    console.log(newPainting);

    res.json({
      status: "Success",
      data: "You have added a new painting",
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//GET/api/v1/paintings
const getPaintingController = async (req, res) => {
  try {
    const paintings = await Painting.find().sort({ createdAt: -1 });
    // res.render("paintings", { paintings });
    res.json({
      status: "Success",
      data: paintings,
    });
  } catch (error) {
    return next(appError(" The resources cannot be found"));
  }
};

module.exports = {
  uploadPaintingController,
  getPaintingController,
};
