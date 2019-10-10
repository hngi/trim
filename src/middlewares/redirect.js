const UrlShorten = require('../models/UrlShorten.js');

const redirectUrlAndUpdateCount = (req, res)=> {
	const requestedClip = {
		urlCode: req.params.urlCode,
		created_by: req.cookies.userId
	};

	UrlShorten.findOne(requestedClip, (error, retrievedClip) => {
		if (error)
			return res.status(500).json({
				error: error
			});

		if (!retrievedClip)
			return res.status(404).json({
				error: 'Not found'
			});

		const newClipCount = retrievedClip.click_count + 1;
		UrlShorten.updateOne(retrievedClip, {click_count: newClipCount}, (error, result)=> {
			if (error)
				return res.status(500).json({
					error: error
				});

			else
				res.redirect(retrievedClip.long_url);
		})
	});
};

module.exports = redirectUrlAndUpdateCount;