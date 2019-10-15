import Joi from '@hapi/joi';
import UrlShorten from "../models/UrlShorten";
import { DOMAIN_NAME, VALID_URL } from "../config/constants";
import { respondWithWarning } from '../helpers/responseHandler';

/**
 * Remove http:// and https:// from long_url
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const stripUrl = async (req, res, next) => {
  const { long_url } = req.body;
  const schema = Joi.object({
    url: Joi.string().regex(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),
  })
  
    const { error } = await schema.validate({ url: long_url });
    if (error) {
      const result = respondWithWarning(res, 400, "Not a valid URL");
      return result;
    }
    req.url = long_url;
    next(); 
};

/**
 * Reject any attempts to trim one of our generated Urls.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const validateOwnDomain = (req, res, next) => {
	// The strippedUrl already contains the hostname, so match it against our own...
	if (req.url.startsWith(DOMAIN_NAME) || 
			req.url.startsWith(`https://${DOMAIN_NAME}`) || 
			req.url.startsWith(`http://${DOMAIN_NAME}`) || 
			req.url.startsWith(`www.${DOMAIN_NAME}`)
			) {

    const result = respondWithWarning(res, 400, "Cannot trim an already generated URL");
    return result;
  }
  next();
};

/**
 * Check for existing long_url by same user.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const urlAlreadyTrimmedByUser = (req, res, next) => {
  const searchParams = {
    long_url: req.url,
    created_by: req.cookies.userID
  };

  UrlShorten.findOne(searchParams, (error, retrievedClip) => {
    if (!retrievedClip) {
      return next();
    }
    const result = respondWithWarning(res, 409, "URL already trimmed");
    return result;
  });
};
