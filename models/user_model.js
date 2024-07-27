const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const userSChema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  issuedBook: {
    type: mongoose.Schema.Types.ObjectId, //see here this issueid is a foreign key here so there should be check that book collection comprise an id that this user is referring to
    ref: "Book",
    required: false,
  },
  returnDate: {
    type: String,
    required: false,
  },
  subscriptionType: {
    type: String,
    required: true,
  },
  subscriptionDate: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});