const UrlShorten = require('../models/UrlShorten.js');
const { domainName } = require('../config/constants');

/**
 * This middleware checks if a url has already been trimmed by the same user.
 * It either responds with the trimmed object from the database,
 * or moves on to the next middleware to create a trim.
 * Note: Trims are stored per user not globally. So the same url can be trimmed by multiple users.
 * Also checks if the URL is one of ours and reject the request if so. (URLs we generated shouldn't be re-trimmed).
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const checkUrl = (req, res, next) => {
	//Reject any attempts to trim one of our generated Urls.
	const isOurUrl = req.body.long_url.startsWith(domainName) || req.body.long_url.startsWith(`https://${domainName}`);
	if (isOurUrl)
		return res.status(400).json({
			error: 'Cannot trim generated URL'
		});

	//Check for existing long_url by same user.
	const searchParams = {
		long_url: req.body.long_url,
		created_by: req.cookies.userId
	};

	UrlShorten.findOne(searchParams, (error, retrievedClip) => {
		if (error)
			return res.status(500).json({
				error: error
			});

		if (retrievedClip) { //If an existing clip is found for this user, respond with it.
			res.status(200).json(retrievedClip);
		}
	
		next(); //If nothing is found, call the next middleware (trimUrl).
	});
};

module.exports = checkUrl;
