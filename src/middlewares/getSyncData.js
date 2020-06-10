import UrlShorten from "../models/UrlShorten";
/**
 * This function renders the landing page and gets list of user trimmed urls
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with trimmed urls
 */
export const getSyncedData = (req, res) => {
  const { userID } = req.body;
  res.cookie("userID", userID, {
    maxAge: 1000 * 60 * 60 * 60 * 30,
  });
  UrlShorten.find({
    created_by: userID //Find all clips created by this user.
  })
    .sort({
      createdAt: "desc" // sort the created clips in a decending order
    })
    .then(clips => {
      //Pass the user's clips to the view engine to render the customized view for this user.
      return res.status(200).json({
        userClips: clips,
        created_by: userID,
        success: true
      });
    });
};