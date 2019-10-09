import UrlShorten from '../models/UrlShorten.js';
import DeletedClip from '../models/deleted-clips';
import { domainName } from '../config/constants';
//import isEmpty from 'is-empty';
//import crypto from 'crypto';

export const trimUrl = (req, res) => {
	//First, check for orphaned urlCodes in the deleted-clips collection. If found, reassign the oldest one.
	DeletedClip.find()
		.sort({deletedAt: 'ascending'}) //In ascending order, document[0] should be the oldest. correct me if I'm wrong pls.
		.then((deletedClips)=> {
			if (deletedClips.length < 1) return; //If there are currently no deleted clips, go on to generate a new one.

			const newClip = new UrlShorten({ //Reassign the oldest deleted clip to the new long url.
				long_url: req.body.long_url,
				clipped_url: deletedClips[0].clipped_url,
				urlCode: deletedClips[0].urlCode,
				created_by: req.cookies.userId,
				click_count: 0
			});				

			newClip.save((err, savedClip)=> {
				if (err) 
					return res.status(500).json({
						error: err
					});
				
				DeletedClip.deleteOne({...deletedClips[0]}).exec(); //Once a deleted clip is reassigned, remove it from the DeletedClips collection.
				res.status(201).json(savedClip);
			});
		})
		.catch((error)=> {
			res.status(500).json({
				error: error
			});
		});

	//If there are no orphaned urlCodes, generate a new one.
		//Probably better to use UrlShorten.estimatedDocumentCount(); cos it's is faster. But does it always give the exact count? (cos it says "estimated").
	UrlShorten.countDocuments({}, (error, count)=> {
		if (error) 
			return res.status(500).json({
				error: error
			});

		const newClipCount = count + 1;

		//Create an alpha-numeric string representation of the count by converting it to base 36. (10 digits + 26 letters)
		const newUrlCode = newClipCount.toString(36); //36 is the highest supported radix. 
		if (newUrlCode.length < 4)
			newUrlCode = '00' + newUrlCode; //Pad Url codes less that 4 characters with zeros.

		const newClip = new UrlShorten({
			long_url: req.body.long_url,
			clipped_url: `${domainName}/${newUrlCode}`,
			urlCode: newUrlCode,
			created_by: req.cookies.userId,
			click_count: 0
		});

		newClip.save((err, savedClip)=> {
			if (err) 
				return res.status(500).json({
					error: error
				});
			
			res.status(201).json(savedClip);
		});
	});
}
  