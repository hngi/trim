export const validateCookie = (req, res, next) => {
  const userID = req.cookies.userId;
  if (userID == undefined) {
    userID = req.session.id;
    res.cookie("userID", userID, { maxAge: 90000, httpOnly: true });
  }
    next();
};
