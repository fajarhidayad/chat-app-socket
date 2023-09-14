import User, { IUser } from "../models/User";

const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return error;
  }
};

const createUser = async (user: IUser) => {
  try {
    const newUser = new User(user);
    await newUser.save();
  } catch (error) {
    console.error(error);
  }
};

export default {
  getUserByEmail,
  createUser,
};
