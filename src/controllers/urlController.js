import UrlShorten from "../models/UrlShorten";
import nanoid from "nanoid";
import { DOMAIN_NAME } from "../config/constants";
import { renderWithWarning } from '../helpers/responseHandler';
import getMetric from '../middlewares/getMetrics'

/**
 * This function trim a new url that hasn't been trimmed before
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with trimmed url
 */
export const trimUrl = async (req, res) => {
  const { userID } = req.cookies;
  try {

      // Generate short code
      let newUrlCode = nanoid(5); //36 is the highest supported radix.

      const newTrim = new UrlShorten({
        long_url: req.url,
        clipped_url: `${DOMAIN_NAME}/${newUrlCode}`,
        urlCode: newUrlCode,
        created_by: req.cookies.userID ,
        click_count: 0
      });

      newTrim.save((err, newTrim) => {
        if (err) {
          const result = renderWithWarning(res, 500, req.cookies.userID, "Server error");
          return result;
        }
        UrlShorten.find({
          created_by: req.cookies.userID //Find all clips created by this user.
        })
          .sort({
            createdAt: "desc" // sort the created clips in a decending order
          }).then(clips => {
            return res.status(201).render("index", {
              userClips: clips,
              success: true,
              created_by: req.cookies.userID
            });
          });
      });
  } catch (err) {
    console.log(err)
    const result = renderWithWarning(res, 500, req.cookies.userID, "Server error");
    return result;
  }
};

/**
 * This function gets original url by the trim code supplied as a parameter
 * e.g trim.ly/TRIM_CODE
 * @param {object} req
 * @param {object} res
 * @returns {object} next middleware
 */
export const getUrlAndUpdateCount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await UrlShorten.findOne({
      urlCode: id
    });

    if (!url) {
      return res.status(404).render('error');
    }
    url.click_count += 1;
    getMetric;
    await url.save();
		
		if(url.long_url.startsWith('http'))
			return res.redirect(url.long_url);
		else 
			res.redirect(`http://${url.long_url}`);
  } catch (error) {
    return res.status(404).render('error');
  }
};

export const getThisMetric= (req,res)=>{
  const { id } = req.params;
  const url = UrlShorten.findOne({
    urlCode: id
  });
  if (!url) {
    return res.status(404).render('error');
  } else{
    return res.render("metrics", {url:url})
  }
}
