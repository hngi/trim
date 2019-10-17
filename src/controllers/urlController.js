import UrlShorten from "../models/UrlShorten";
import nanoid from "nanoid";
import { DOMAIN_NAME } from "../config/constants";
import { respondWithWarning } from '../helpers/responseHandler';

/**
 * This function trims a new url that hasn't been trimmed before
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with trimmed url
 */
export const trimUrl = async (req, res) => {
	try {
		const {expiry_date, custom_url} = req.body;

		let newUrlCode;

		//If the user submitted a custom url, execute this block.
		if (custom_url) {
			//Search the db for this custom url.
			let retrievedClip = await UrlShorten.findOne({urlCode: custom_url});
			
			//If an existing clip already has the same custom url code....
			if (retrievedClip) {
				//If the existing clip has expired...
				if (retrievedClip.expiry_date && retrievedClip.expiry_date < Date.now()) {
					//delete it. The custom_url will be considered available for use.
					await UrlShorten.deleteOne(retrievedClip);
				}
				else //If the custom url is in use and not expired, respond with error.
					return respondWithWarning(res, 409, "Custom URL already in use");
			}

			//If the custom url is available for use, make it the new url code.
			newUrlCode = custom_url;
			//console.log(custom_url + ' ' + newUrlCode);
		}
		else newUrlCode = nanoid(5); //If no custom url is provided, generate a random one.
    
		const newTrim = new UrlShorten({
			long_url: req.url,
			clipped_url: `${DOMAIN_NAME}/${newUrlCode}`,
			urlCode: newUrlCode,
			created_by: req.cookies.userID,
			click_count: 0
		});
		
		// If the user provided an expiry date, use it. If not, leave the field blank.
		if (expiry_date) {
      newTrim.expiry_date = new Date(expiry_date);
    }			

		const trimmed = await newTrim.save()
		
    if (!trimmed) {
      console.log("Failed to save new trim");
			return respondWithWarning(res, 500, "Server error");
		}
		
		res.status(201).json({
			success: true,
			payload: trimmed
		});
  } 
  catch (err) {
		console.log(err);
    return respondWithWarning(res, 500, "Server error");
  }
};

/**
 * This function gets original url by the trim code supplied as a parameter
 * e.g trim.ly/TRIM_CODE
 * @param {object} req
 * @param {object} res
 * @returns {object} next middleware
 */
export const getUrlAndUpdateCount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await UrlShorten.findOne({
      urlCode: id
    });

    if (!url) {
      return res.status(404).render('error');
    }
    url.click_count += 1;
    await url.save();
		
		if(url.long_url.startsWith('http'))
			return res.redirect(url.long_url);
		else 
			res.redirect(`http://${url.long_url}`);
  } catch (error) {
    return res.status(404).render('error');
  }
};
