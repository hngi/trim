import UrlShorten from "../models/UrlShorten";
import nanoid from "nanoid";
import { DOMAIN_NAME } from "../config/constants";

/**
 * This function trim a new url that hasn't been trimmed before
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with trimmed url
 */
export const trimUrl = (req, res) => {
  UrlShorten.countDocuments({}, (error, count) => {
    if (error)
      return res.status(500).json({
        error: error
      });

    const newClipCount = count + 1;

    // Generate short code
    let newUrlCode = nanoid(5); //36 is the highest supported radix.

    const newTrim = new UrlShorten({
      //Reassign the oldest deleted clip to the new long url.
      long_url: req.strippedUrl,
      clipped_url: `${DOMAIN_NAME}/${newUrlCode}`,
      urlCode: newUrlCode,
      created_by: req.cookies.userId,
      click_count: 0
    });

    console.log("short code", newUrlCode);
    newTrim.save((err, newTrim) => {
      if (err) {
          console.log("error bi", err);
        res.status(500);
        res.render("../src/views/index", {
          userClips: [],
          success: false,
          error: "Server error"
        });
      }
      res.status(201);
      UrlShorten.find({
        created_by: req.cookies.userId //Find all clips created by this user.
      }).then(clips => {
          req.session.save();
        res.render("../src/views/index", { userClips: clips, success: true });
      });
    });
  });
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
      return res.status(404).json({
        status: "error",
        error: "Url not found"
      });
    }

    url.click_count += 1;
    await url.save();
    return res.redirect(url.long_url);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message
    });
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
