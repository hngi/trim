import Metric from "../models/Metric";
import { respondWithWarning } from '../helpers/responseHandler';

/**
 * This function get click metrics for a url
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with url metrics
 */
export const getUrlClickMetrics = async (req, res) => {
	try {
		const { urlSortenId } = req.params;
  
    const clickMetrics = await Metric.find({ urlSortenId })
      .populate('urlShortenId')
      .exec(function (err, messages) {
        if (err) throw err;
        console.log(JSON.stringify(messages, undefined, 4));
      });
		
    // if (!clickMetrics) {
		// 	return respondWithWarning(res, 404, "No data found");
		// }
		
		// res.status(201).json({
		// 	success: true,
    //   payload: clickMetrics,
		// });
  } 
  catch (err) {
		console.log(err);
    return respondWithWarning(res, 500, "Server error");
  }
};
