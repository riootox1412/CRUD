import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.json({
      status: 200,
      message: "Data All User",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      status: 200,
      message: "Data user",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
    };
    await User.create(payload);
    res.json({
      status: 200,
      message: "create user success",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
    };
    await User.update(payload, { where: { id: req.params.id } });
    res.json({
      status: 200,
      message: "User update success",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      status: 200,
      message: "Data user delete success",
    });
  } catch (error) {
    console.log(error.message);
  }
};
