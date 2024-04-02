


const register = async (req, res, next) => {
  const encriptedPassword = await db.korisnik.prototype.encryptPassword(
    req.body.password
  );

  const isFirstAccount = await db.korisnik.findOne();
  const role = isFirstAccount ? 'USER' : 'ROOT';

  const korisnik = db.korisnik.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: encriptedPassword,
    email: req.body.email,
    role: role,
    isVerified: false,
    token: '',
  });

  res.status(StatusCodes.CREATED).json({ success: true, });
};