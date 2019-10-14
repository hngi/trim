import UrlShorten from "../models/UrlShorten";
import path from "path";

/**
 * This function renders the landing page and gets list of user trimmed urls
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with trimmed url
 */
export const renderLandingPage = (req, res) => {
  // This is undefined :(
  const { userID } = req.cookies;
  UrlShorten.find({
    created_by: userID //Find all clips created by this user.
  })
    .sort({
      createdAt: "desc" // sort the created clips in a decending order
    })
    .then(clips => {
      //Pass the user's clips to the view engine to render the customized view for this user.
      return res.status(200).render("index", {
        userClips: clips,
        created_by: userID,
        success: true
      }); // TODO: collect cookie data from req object
    });
};
