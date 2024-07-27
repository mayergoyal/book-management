const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();
const { userModel, bookModel } = require("../models/index");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addnewbook,
  updatebook,
} = require("../controllers/book_controller");
//        BOOKS   **********************************

/**
 * route:/books
 * method:get
 * description:get all books
 * access:public
 * parameters:none
 */
/*
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});*/
router.get("/", getAllBooks);
/**
 * route:/books
 * method:post
 * description:crate new book
 * access:public
 * parameters:none
 */
/*
router.post("/", (req, res) => {
  const { id, name, author, genre, price, publisher } = req.body;
  const book = books.find((each) => each.id === id);
  if (book) {
    return res.status(404).json({
      success: false,
      messsage: "already exist",
    });
  }
  books.push({
    id,
    name,
    author,
    genre,
    price,
    publisher,
  });
  return res.status(200).json({
    success: true,
    message: "added successfully",
    data: books,
  });
});*/
router.post("/", addnewbook);
/**
 * route:/books/issued
 * method:get
 * description:get all the books that are issued
 * access:public
 * parameters:none
 */
router.get("/:id", getSingleBookById);
router.get("/issued", getAllIssuedBooks);
/*
router.get("/issued", (req, res) => {
  const userwithissuedbook = users.filter((each) => {
    if (each.issuedBook) {
      return each;
    }
  });
  const issuedBooks = [];
  userwithissuedbook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedby = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no issued",
    });
  }
  return res.status(200).json({
    data: issuedBooks,
  });
});*/
/**
 * route:/books/:id
 * method:get
 * description:get a single user by this/her id
 * access:public
 * parameters:id
 */
/*
router.get("/:id", (req, res) => {
  const { id } = req.params; //params means perimeter so req means that url so url m jo parameter pass krenge mtlb id , that will be stored in that literal
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book not found here",
    });
  }
  return res.status(200).json({
    success: true,
    message: "book found",
    data: book,
  });
});*/
/**
 * route:/books/:id
 * method:put
 * description:update book details by id
 * access:public
 * parameters:id
 */
router.put("/:id", updatebook);
/*
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);
  if (book) {
    const updatedbooks = books.map((each) => {
      if (each.id === id) {
        return { ...each, ...data };
      }
      return each;
    });
    return res.status(200).json({
      success: true,
      message: "updatedion done",
      data: updatedbooks,
    });
  }
  return res.status(404).json({
    success: false,
    message: "not found ",
  });
});*/

module.exports = router;
