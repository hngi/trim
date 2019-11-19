//import UrlShorten from '../models/UrlShorten';


/** Sends an error to the frontend upon failure of a request.
  * @param  {Object} res
  * @param  {Number} statusCode
  * @param  {String} error
  */
export const respondWithWarning = (res, statusCode, error) => {
  res.status(statusCode).json({
		success: false,
		error: error
	});
};