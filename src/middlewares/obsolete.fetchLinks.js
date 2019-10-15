import UrlShorten from "../models/UrlShorten";

export const fetchLinks = async (req, res, next) =>{
  try{
    const {userID} = req.cookies;
    const clips = await UrlShorten.find({
      created_by: userID
    }).sort({
      createdAt: "desc"
    })
    return res.status(200).json({clips})
  }catch(exception){
    next(exception)
  }
}