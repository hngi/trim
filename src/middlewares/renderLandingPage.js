const UrlShorten = require('../models/UrlShorten.js');

/**
 * This function renders the landing page and gets list of user trimmed urls
 * @param {object} req
 * @param {object} res
 */
const renderLandingPage = (req, res) => {
	UrlShorten.find({
    created_by: req.cookies.userID //Find all clips created by this user.
	})
	.then((clips) => { //Pass the user's clips to the view engine to render the customized view for this user.
		res.render('index.ejs', {userClips: clips}); //Adding the file extension is important. Fixed an error.
	});
};

module.exports = renderLandingPage;