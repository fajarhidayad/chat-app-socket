import User, { IUser } from '../models/User';

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

const createUser = async (user: IUser) => {
  const newUser = new User(user);
  await newUser.save();
};

export default {
  getUserByEmail,
  createUser,
};
