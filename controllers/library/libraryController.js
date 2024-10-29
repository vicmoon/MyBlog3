const Library = require('../../model/library/Library');
const appError = require('../../utils/appError');

const uploadBookController = async (req, res, next) => {
  const { title } = req.body;

  try {
    // Validate if the file upload was successful
    if (!req.file || !req.file.path) {
      return next(
        appError('Book cover is missing. Please upload a book cover.')
      );
    }

    const newBook = await Library.create({
      title,
      bookCover: req.file.path, // Ensure req.file.path is correct
    });

    console.log('Book created:', newBook);
    res.redirect('/api/v1/library');
  } catch (error) {
    return next(appError(error.message));
  }
};

const getBookController = async (req, res, next) => {
  try {
    const library = await Library.find().sort({ createdAt: -1 });
    res.render('library', { library });
  } catch (error) {
    return next(appError('The books cannot be found'));
  }
};

module.exports = {
  uploadBookController,
  getBookController,
};
