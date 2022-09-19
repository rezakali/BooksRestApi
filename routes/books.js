const express = require("express");
const router = express.Router();
const { Book, validateBook } = require("../models/books");

/**POST METHOD */

router.post("/", async (req, res) => {
  const error = await validateBook(req.body);
  if (error.message) {
    res.status(400).send(error.message);
  }

  book = new Book({
    name: req.body.bookName,
    author: {
      name: req.body.authorName,
      age: req.body.authorAge,
    },
    genre: req.body.genre,
  });
  book
    .save()
    .then((book) => {
      res.send(book);
    })
    .catch((error) => {
      res.status(500).send("book was not stored in db");
    });
});

/**Get Method */
router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.send(books))
    .catch((error) => {
      res.status(500).send("Something went Wrong");
    });
});

/**GET BOOK BY ID */
router.get("/:bookid", async (req, res) => {
  const book = await Book.findById(req.params.bookid);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send.message("Book Not Found");
  }
});

/**UPDATE METHOD */
router.put("/:bookid", async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.bookid,
    {
      name: req.body.bookName,
      author: {
        name: req.body.authorName,
        age: req.body.authorAge,
      },
      genre: req.body.genre,
    },
    { new: true }
  );
  if (book) {
    res.send(book);
  } else {
    res.status(404).send.message("Book Not Found");
  }
});

/**DELETE METHOD */
router.delete("/:bookid", async (req, res)=> {
const book = await Book.findByIdAndRemove(req.params.bookid)
if(book){
  res.send(book);
}else{
  res.status(404).send.message("book not found")
}
})
module.exports = router;
