import UrlShorten from '../models/UrlShorten';


/**
 * This function renders the landing page and gets list of user trimmed urls
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with trimmed url
 */
export const renderLandingPage = (req, res) => {
  UrlShorten.find({
    created_by: req.cookies.userID //Find all clips created by this user.
	}).sort({
		createdAt: 'desc' // sort the clips decending 
	})
	.then((clips) => { //Pass the user's clips to the view engine to render the customized view for this user.
		res.render('../src/views/index', {userClips: clips, userID: '123-123-123-123'}); // TODO: collect cookie data from req object
	});
};
