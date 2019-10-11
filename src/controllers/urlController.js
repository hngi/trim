import UrlShorten from "../models/UrlShorten";
import nanoid from "nanoid";
import { DOMAIN_NAME } from "../config/constants";

/**
 * This function trim a new url that hasn't been trimmed before
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with trimmed url
 */
export const trimUrl = async(req, res) => {
  try{
    const { userID } = req.cookies
    if(!userID) {
     const userID = req.cookies.userID;
    }
    console.log(userID);
    // Generate short code
    let newUrlCode = nanoid(5); //36 is the highest supported radix.

    const newTrim = new UrlShorten({
      //Reassign the oldest deleted clip to the new long url.
      long_url: req.strippedUrl,
      clipped_url: `${DOMAIN_NAME}/${newUrlCode}`,
      urlCode: newUrlCode,
      created_by: userID,
      click_count: 0
    });

    newTrim.save((err, newTrim) => {
      if (!newTrim) {
        console.log(err);
        return res.status(500).render("index", {
          userClips: [],
          success: false,
          created_by: req.cookies.userID,
          error: "Server error"
        });
      }
      const { userID } = req.cookies
      UrlShorten.find({
        created_by: userID //Find all clips created by this user.
      }).sort({
        createdAt: 'desc' // sort the created clips in a decending order
      })
        .then((clips) => { //Pass the user's clips to the view engine to render the customized view for this user.
          return res.status(200).render('index', { userClips: clips, created_by: userID, success: true }); // TODO: collect cookie data from req object
        });
    });
  } catch(err) {
    return res.status(500).render('error');
  }
};

/**
 * This function delete a trimmed url
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with trimmed url
 */
export const deleteUrl = (req, res) => {
  return;
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
    const { urlCode } = req.params;
    const url = await Url.findOne({
      urlCode
    });

    if (!url) {
      return res.status(404).render('error')
    }

    url.click_count += 1;
    await url.save();
    return res.redirect(url.long_url);
  } catch (error) {
    return res.status(404).render('error')
  }
};

/**
 * This redirects user to main url
 * @param {object} req
 * @param {object} res
 * @returns {object} redirects to original url or 404 page if not found
 */
export const redirectUrl = async (req, res, next) => {
  return res.redirect(url.long_url);
};
