import UrlShorten from "../models/UrlShorten";
import nanoid from "nanoid";
import dns from "dns";
import { DOMAIN_NAME } from "../config/constants";

/**
 * This function trim a new url that hasn't been trimmed before
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with trimmed url
 */
export const trimUrl = async (req, res) => {
  try {
    const { userID } = req.cookies;
    UrlShorten.countDocuments({}, (error, count) => {
      if (error)
        return res.status(500).json({
          error: error
        });

      dns.lookup(req.strippedUrl, (err, addr, family) => {
        if (err) {
          return res
            .status(400)
            .send({ success: false, message: "URL does not exist bro :(" });
        } else {
          // If the URL exists, check if the user has already trimmed it before...
          // if true, send that url back, if not create a new URL document.

          const newClipCount = count + 1;

          const { userID } = req.cookies;

          // Generate short code
          let newUrlCode = nanoid(5); //36 is the highest supported radix.

          const newTrim = new UrlShorten({
            long_url: req.url.href,
            clipped_url: `${DOMAIN_NAME}/${newUrlCode}`,
            urlCode: newUrlCode,
            created_by: userID,
            click_count: 0
          });

          newTrim.save((err, newTrim) => {
            if (err) {
              console.log("Error =>", err);
              res.status(500);
              res.render("index", {
                userClips: [],
                success: false,
                error: "Server error",
                created_by: userID
              });
            }
            UrlShorten.find({
              created_by: req.cookies.userID //Find all clips created by this user.
            }).then(clips => {
              res.status(201).render("index", {
                userClips: clips,
                success: true,
                created_by: userID
              });
            });
          });
        }
      });
    });
  } catch (err) {
    next(err);
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
    const { id } = req.params;
    const url = await UrlShorten.findOne({
      urlCode: id
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
