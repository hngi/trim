import nanoid from 'nanoid'
export const validateCookie = (req, res, next) => {
  const {cookies} = req
  const newID = nanoid()
  if(Object.entries(cookies).length === 0){
		res.cookie('userID', newID, {maxAge: 1000000*60*2, secure: process.env.NODE_ENV !== 'development', sameSite: true})
  }
  next()
};
