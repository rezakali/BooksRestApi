const mongoose = require("mongoose");
const Author = require("./author");
const yup = require("yup");

/***BOOK SCHEMA */

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  author: Author.schema,
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
});

const validateBook = (book) => {
  const schema = yup.object().shape({
    bookName: yup.string().required().min(3).max(50),
    authorName: yup.string().required().min(3).max(30),
    authorAge: yup.number().required().min(20).max(85),
    genre: yup.string().required().min(3).max(30),
  });

  return schema
    .validate(book)
    .then((book) => book)
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

exports.Book = new mongoose.model("Book", BookSchema);
exports.validateBook = validateBook;
