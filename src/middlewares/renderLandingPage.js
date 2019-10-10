import Trim from '../models/Trim';

export const renderLandingPage = (req, res) => {
	Trim.find({
    created_by: req.cookies.userID //Find all clips created by this user.
	})
	.then((clips) => { //Pass the user's clips to the view engine to render the customized view for this user.
		res.render('../src/views/index', {userClips: clips});
	});
};