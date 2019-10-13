import UrlShorten from '../models/UrlShorten';


/**
  * @param  {Object} res
  * @param  {Number} statusCode
  * @param  {String} userID
  * @param  {String} error
  * @returns {Object} null
  */
export const renderWithWarning = (res, statusCode, userID, error) => {
  UrlShorten.find({
    created_by: userID //Find all clips created by this user.
  }).then(clips => {
    res.status(statusCode).render("index", {
      userClips: clips,
      success: false,
      created_by: userID,
      error,
    });
  });
};