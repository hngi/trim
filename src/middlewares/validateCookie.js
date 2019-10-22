import nanoid from "nanoid";
export const validateCookie = (req, res, next) => {
  if (req.cookies.userID) {
    next();
  } else {
    const newID = nanoid();
    res.cookie("userID", newID, {
      maxAge: 1000 * 60 * 60 * 60 * 30,
    });
    next();
  }
};
