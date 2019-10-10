import UrlShorten from '../models/UrlShorten';


/**
 * This function gets original url by the trim code supplied as a parameter
 * e.g trim.ly/TRIM_CODE
 * @param {object} req
 * @param {object} res
 * @returns {object} next middleware
 */
export const redirectUrlAndUpdateCount = async (req, res, next) => {
  try {
    const url = await UrlShorten.findOne({ urlCode: req.params.urlCode });
    if (url) {
      return res.status(404).json({ status: 'error', error: 'Url not found' });
    }
    url.click_count += 1;
    await url.save();
    next();
  } catch (error) {
    return res.status(500).json({  status: 'error', error: error.message });
  }
}


/**
 * This redirects user to main url
 * @param {object} req
 * @param {object} res
 * @returns {object} redirects to original url or 404 page if not found
 */
export const redirectUrl = async (req, res, next) => {
  return res.redirect(url.long_url);
}
