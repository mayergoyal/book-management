const { userModel, bookModel } = require("../models/index");

exports.getAllUsers = async (req, res) => {
  const users = await userModel.find();
  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no user to show",
    });
  }
  return res.status(200).json({
    success: true,
    message: "users are here",
    data: users,
  });
};

exports.addnewuser = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "no  data to add",
    });
  }
  await userModel.create(data);
  const users = await userModel.find();
  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no user to show",
    });
  }
  return res.status(200).json({
    success: true,
    message: "users are here",
    data: users,
  });
};
exports.getNewUserById = async (req, res) => {
  const { id } = req.params;
  const users = await userModel.findById(id);
  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no user to show of this id",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user with this id is ",
    data: users,
  });
};

exports.updateuser = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "no  data to update",
    });
  }
  const updateuser = await userModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        ...data,
      },
    },
    {
      new: true,
    }
  );
  return req.status(200).json({
    success: true,
    mesage: "updated successfully",
    data: updateuser,
  });
};

exports.deleteuser = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.deleteOne({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "deleted the user",
    data: user,
  });
};
