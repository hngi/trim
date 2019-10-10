import UrlShorten from '../models/UrlShorten';

/**
 * This middleware checks if a url has already been trimmed.
 * It either returns the trimmed object from db or
 * Move to the next middleware to create a trim
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} trimmed url from database
 * @returns {callback} next callback fruntion to move to the next middleware
 */
export const checkUrl = async (req, res, next) => {
  const { urlCode } = res.params;
  const trimmed = await UrlShorten.findOne({ urlCode });
  if (trimmed){
    res.redirect(trimmed.long_url);
  }
  next();
}
