import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json(users);
};
