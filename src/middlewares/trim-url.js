import UrlShorten from '../models/UrlShorten.js';
import isEmpty from 'is-empty';
import crypto from 'crypto';

const createAndSaveUrlShorten = (shortUlrObj, res) => {
	// Generate a random string to replace the url
	let randomStr = crypto.randomBytes(2).toString('hex');
	const urlCode = req.params.id;
	// Check if the random string already exist in DB
	UrlShorten.findOne({ urlCode: randomStr }, (err, url) => {
		if (err) {
			console.log(err);
		} else if (url == null || isEmpty(url)) {
			console.log("url obj", url, randomStr);
			shortUlrObj.urlCode = randomStr;
			// Not a duplicate
			shortUlrObj.save(err => {
				if (err) {
					res.status(400).json({ success: true, msg: err });
				}
				res.status(200).json({ success: true, url: baseUrl + randomStr });
			});
		} else {
			// Generated random string already exist in the DB
			saveShortUrl(shortUlrObj);
		}
	});
}
isEmpty = (obj) => {
	if (obj == null) return true;
	return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export const trim_url = (req, res) => {
	let shortUrl;
	
	if (isEmpty(req.body)) {
		res
			.status(400)
			.json({ success: false, msg: "No data is sent!", data: req.body });
	}

	// create a short url
	shortUrl = new UrlShorten({
		url: req.body.url,
	});
	createAndSaveUrlShorten(shortUrl, res);
}
  