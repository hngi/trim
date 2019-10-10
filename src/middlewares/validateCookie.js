export const validateCookie = (req, res, next) => {
  let userID = req.cookies.userId;
  if (userID == undefined) {
    userID = req.session.id;
    res.cookie("userID", userID, { maxAge: 90000, httpOnly: true });
  }
  next();
};
