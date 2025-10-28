const bcrypt = require('bcrypt');
const {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserData,
} = require('./user.model');
const { generateToken } = require('../utils/auth.middleware');
const { addMinutes } = require('date-fns');

const registerUser = async ({ name, email, password }) => {
  const user = await findUserByEmail(email);
  if (user) throw new Error('User with this email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({ name, email, password: hashedPassword });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = addMinutes(new Date(), 5);
  const token = generateToken({ id: newUser.id });
  // await updateUserOtp(newUser.id, otp, otpExpiry);
  // await sendOtpEmail(email, otp);

  return {
    message: 'User registered successfully.',
    token,
  };
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = generateToken({ id: user.id });
  return { user, token };
};

const getUserProfileById = async (id) => {
  const user = await findUserById(id);
  if (!user) throw new Error('User not found');
  return user;
};

const updateUserProfile = async (userId, updates) => {
  const updatedUser = await updateUserData(userId, updates);
  return { changes: Object.keys(updates), updatedUser };
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfileById,
  updateUserProfile,
};
