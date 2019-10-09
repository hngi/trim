import UrlShorten from '../models/UrlShorten.js';

export const renderLandingPage = (req, res) => {
	UrlShorten.find({
    created_by: req.cookies.userID //Find all clips created by this user.
	})
	.then((clips) => { //Pass the user's clips to the view engine to render the customized view for this user.
		res.render('../index', {userClips: clips});
	});
};