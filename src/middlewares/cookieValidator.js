export const cookieValidtor = (req, res, next) => {
  const userId = req.cookies.userID;
  if (userId == undefined) {
    userId = req.session.id;
    res.cookie("userID", userId, { maxAge: 90000, httpOnly: true });
  }
    next();
};
