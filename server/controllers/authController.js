const CustomError = require(`../errors/index.js`);
const db = require('../models/index.js');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes');

const register = async (req, res, next) => {
  const encriptedPassword = await db.korisnik.prototype.encryptPassword(
    req.body.password
  );

  const isFirstAccount = await db.korisnik.findOne();
  const role = isFirstAccount ? 'USER' : 'ADMIN_ROOT';

  const email = await db.korisnik.findOne({ where: { email: req.body.email } });

  if (!email) {
    const korisnik = db.korisnik.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: encriptedPassword,
      email: req.body.email,
      role: role,
      isVerified: false,
      token: '',
    });

    res.status(StatusCodes.OK).json({ success: true });
  } else {
    throw new CustomError.BadRequestError('Email postoji');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await db.korisnik.findOne({ where: { email: email } });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await bcript.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Password is not correct');
  }

  const user_id = user.user_id;

  const token = jwt.sign(
    { user_id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );

  user.isVerified = true;

  res.status(200).json({ token: token });
};

module.exports = { register, login };