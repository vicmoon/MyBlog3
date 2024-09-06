const Book = require("../../model/resources/Books");
const appError = require("../../utils/appError");

//POST/api/v1/resources/
const addBookController = async (req, res, next) => {
  // Log the incoming request body
  console.log("Request Body:", req.body);

  const { title, author, link } = req.body;

  try {
    // Log parsed variables
    // console.log({ title, author, image });

    const book = await Book.create({ title, author, link });
    res.status(201).json({
      data: book,
    });
  } catch (error) {
    console.error("Error Details:", error);
    return next(appError(`An error occurred: ${error.message}`, 400)); // Bad Request
  }
};

//GET/api/v1/resources
const getBookController = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    return next(appError(" The resources cannot be found"));
  }
};

module.exports = {
  addBookController,
  getBookController,
};
