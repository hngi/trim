import UrlShorten from '../models/UrlShorten';
import { DOMAIN_NAME, VALID_URL } from '../config/constants';



/**
 * Remove http:// and https;// from long_url
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const stripUrl = (req, res, next) => {
  let {long_url} = req.body;
  if (long_url.startsWith('https://')) {
    res.strippedUrl = long_url.slice(8, long_url.length);
  }
  if (long_url.startsWith('http://')) {
    res.strippedUrl = long_url.slice(7, long_url.length);
  }
  req.strippedUrl = long_url; // henceforthe req.strippedUrl is used in place of req.body.long_url
  next();
};


/**
 * Reject any attempts to trim one of our generated Urls.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const validateOwnDomain = (req, res, next) => {
  if (req.strippedUrl.startsWith(DOMAIN_NAME)) {
    res.status(400);
    res.render('../src/views/index', { userClips: [], success: false, error: 'Cannot trim an already generated URL' });
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
    long_url: req.strippedUrl,
    created_by: req.cookies.userId
  };

  UrlShorten.findOne(searchParams, (error, retrievedClip) => {
    if (!retrievedClip) {
      return next();
    }
    res.status(200);
    UrlShorten.find({
      created_by: req.cookies.userId //Find all clips created by this user.
    })
      .then((clips) => {
        res.render('../src/views/index', { userClips: clips, success: true });
      });
  });
};
