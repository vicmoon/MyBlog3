const Painting = require('../../model/painting/Painting');
const appError = require('../../utils/appError');

const uploadPaintingController = async (req, res, next) => {
  const { title } = req.body;

  try {
    const newPainting = await Painting.create({
      title,
      paintingImage: req.file.path, // req.file.path stores the uploaded image path
    });

    console.log('Painting created', newPainting);
    res.redirect('/api/v1/paintings');
  } catch (error) {
    return next(appErr(error.message));
  }
};

//GET/api/v1/paintings
const getPaintingController = async (req, res) => {
  try {
    const paintings = await Painting.find().sort({ createdAt: -1 });

    // Render the EJS view with paintings data
    res.render('paintings', { paintings });
  } catch (error) {
    return next(appError('The resources cannot be found'));
  }
};

module.exports = {
  uploadPaintingController,
  getPaintingController,
};
