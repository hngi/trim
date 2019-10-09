const passport = require('passport');
const jsonWebT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bcryptSaltRounds = 10;
const path = require('path');
const urlRegex = require('urlRegex');
const validator = require('express-validator');


let url;
let user;
let password;
let email;


const authenticate = (user, url, error, isStrict = true) =>
  function auth(req, res, next) {
    if (req.user && req.url) return next();
    return passport.authenticate(type, (err, user, url) => {
      if (err) return res.status(400);
      if (!user && !url && isStrict) return res.status(401).json({ error });
      if (user && url && isStrict && !user.verified && !url.verified) {
        return res.status(400).json({
          error:
            'Your email address and url is not verified.' +
            'Click on signup to get the verification link again.',
        });
      }


module.exports = (req, res, next) => {
   try {
   	   const email = userId;
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jsonWebT.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
       } else {
        next();
    } catch {
        res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
 } 

 export const inputFormValidation = [
  validator
    .body("email","url")
    .exists()
    .withMessage("Email must be provided.")
    .isEmail()
    .withMessage("Email is not valid.","Url is not valid")
    .trim()
    .normalizeEmail(),
  validator
    .body("password", "Password must be at least 8 chars long.")
    .exists()
    .withMessage("Password must be provided.")
    .isLength({ min: 8 })
];

export const validateBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsObj = errors.mapped();
    const emailError = errorsObj.email && errorsObj.email.msg;
    const passwordError = errorsObj.password && errorsObj.password.msg;
    return res.status(400).json({ error: emailError || passwordError });
  }
  return next();
};  


if (url.password) {
    const isMatch = await bcrypt.compare(req.body.password, url.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Password is not correct' });
  }


    const isValidUrl = urlRegex({ exact: true, strict: false ,clipped: false}).test(url);
  if (!isValidUrl) return res.status(400).json({ error: 'URL is not valid.' });
