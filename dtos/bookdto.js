//data tranfer object - book
class IssuedBook {
  _id; //autogenerated id
  name;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  //whenevre we create obj , the constructor gets invoked , the contructor will be called !!!!!!!!!!!!
  //it is parameterised constructor
  constructor(user) {
    this._id = user.issuedBook._id;
    this.name = user.issuedBook.name;
    this.genre = user.issuedBook.genre;
    this.price = user.issuedBook.price;
    this.publisher = user.issuedBook.publisher;
    this.issuedBy = user.issuedBook;
    this.issuedDate = user.issuedBook;
    this.returnDate = user.issuedBook;
  }
}
module.exports = IssuedBook;
