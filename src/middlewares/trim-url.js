import UrlShorten from '../models/UrlShorten.js';
import { domainName } from '../config/constants';
//import isEmpty from 'is-empty';
//import crypto from 'crypto';

export const trimUrl = async (req, res) => {
	//First, check for orphaned urlCodes in the deleted-clips collection. If found, reassign the oldest one.

	//If there are no orphaned urlCodes, generate a new one.
		//Probably better to use UrlShorten.estimatedDocumentCount(); cos it's is faster. But does it always give the exact count? (cos it says "estimated").
	const count = await UrlShorten.countDocuments({});
	const newClipCount = count + 1;

	//Create an alpha-numeric string representation of the count by converting it to base 36. (10 digits + 26 letters)
	const newUrlCode = newClipCount.toString(36); //36 is the highest supported radix. 
	if (newUrlCode.length < 4)
		newUrlCode = '00' + newUrlCode; //Pad Url codes less that 4 characters on the left.

	const newClip = new UrlShorten({
		long_url: req.body.long_url,
		clipped_url: domainName + '/' + newUrlCode,
		urlCode: newUrlCode,
		created_by: req.cookies.userId,
		click_count: 0
	});

	newClip.save((err)=> {
  	if (err) return handleError(err);
		
		res.send(JSON.stringify(newClip));
	});
}
  