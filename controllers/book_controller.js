const { userModel, bookModel } = require("../models/index");
const IssuedBook = require("../dtos/bookdto");

exports.getAllBooks = async (req, res) => {
  const books = await bookModel.find(); //find is a function of mongodb , give all the data from that schema
  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "not found all books",
    });
  }
  return res.status(200).json({
    success: true,
    message: "fetching all the books",
    data: books,
  });
  //in every mongodb function , async and await should be used
};
exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookModel.findById(id);
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
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await userModel
    .find({
      issuedBook: { $exists: true },
    })
    .populate("issuedBook");
  //popluate is used when some condition is used in the find function
  //data transfer object

  const issuedBooks = users.map((each) => new IssuedBook(each));
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no issued",
    });
  }
  return res.status(200).json({
    data: issuedBooks,
  });
};

exports.addnewbook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "no data to add",
    });
  }
  await bookModel.create(data); //add new row
  const allBooks = await bookModel.find();
  return res.status(200).json({
    success: true,
    message: "book added",
    data: allBooks,
  });
};
exports.updatebook = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updateBook = await bookModel.findOneAndUpdate(
    {
      _id: id, //_id is autogenerated one  , this is a condition that when _id (autogenerated one) is equal to the paramed id then do the following upadte
    },
    data,
    {
      new: true, // due to some clitches , sometimes we don't get refreshed data , so this new keyword makes sure that we got one
    }
  );
  return req.status(200).json({
    success: true,
    mesage: "updated successfully",
    data: updateBook,
  });
};
