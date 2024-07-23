const express = require("express");
const { users } = require("../data/users.json");
const router = express.Router();
/**
 * route:/users
 * method:get
 * description:get all users
 * access:public
 * parameters:none
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});
/**
 * route:/users
 * method:post
 * description:creating a new user
 * access:public
 * parameters:none
 */
router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).json({
      success: false,
      message: "user with the id already exists",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionDate,
    subscriptionType,
  });
  return res.status(201).json({
    success: false,
    message: "user is created",
    data: users,
  });
});
/**
 * route:/users/:id
 * method:get
 * description:get a single user by this/her id
 * access:public
 * parameters:id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params; //params means perimeter so req means that url so url m jo parameter pass krenge mtlb id , that will be stored in that literal
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user found",
    data: user,
  });
});
/**
 * route:/users/:id
 * method:put
 * description:updating a user by their ud
 * access:public
 * parameters:id
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  const updateuserdata = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "updated successfully",
    data: updateuserdata,
  });
});
/**
 * route:/users/:id
 * method:delete
 * description:udeleting a user by their ud
 * access:public
 * parameters:id
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`received id is ${id}`);
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does n't exist",
    });
  }
  const index = users.indexOf(user); //indexOf is a method which gives the index of user in users
  users.splice(index, 1); //splice is for remove element from that index 1 no. of time
  return res.status(200).json({
    success: true,
    message: "deleted the user",
    data: users,
  });
});

/**
 * /users/subscription-details/:id

 * method: get
 * description:{ * get subscription information of a particular user through his/her id
 * get date of subscription 
 * get till date 
 * get fine if any}
 * access:public
 * parameters:id
 */
router.get("/subscriptiondetails/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((ele) => ele.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };
  const subscriptionType = (date) => {
    if (user.subscriptionType == "Basic") {
      date += 90;
    } else if (user.subscriptionType == "Standard") {
      date += 180;
    } else if (user.subscriptionType == "Premium") {
      date += 365;
    }
    return date;
  };
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);
  const data = {
    ...user,
    issubscriptionExpired: subscriptionExpiration <= currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : -currentDate + subscriptionExpiration,
    fine:
      returnDate < currentDate
        ? subscriptionDate <= currentDate
          ? 100 + (currentDate - returnDate) * 50
          : (currentDate - returnDate) * 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "fething subscription details is successful",
    data,
  });
});

module.exports = router;
