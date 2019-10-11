export const validateCookie = (req, res, next) => {
  let userId = req.cookies.userId;
  if (userId == undefined) {
    userId = req.session.id;
    res.cookie("userId", userId, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    });
  }
  next();
};
