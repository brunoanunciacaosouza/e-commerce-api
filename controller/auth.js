const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createJTW } = require('../utils/index');

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExist = await User.findOne({ email });

  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError('Email already exist');
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createJTW({ payload: tokenUser });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  res.send('login user');
};

const logout = async (req, res) => {
  res.send('logout user');
};

module.exports = {
  register,
  login,
  logout,
};
