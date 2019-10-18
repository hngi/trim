import Metric from "../models/Metric";
import UrlShorten from "../models/UrlShorten";
import { respondWithWarning } from '../helpers/responseHandler';
import { Runnable } from "mocha";
import mongoose from 'mongoose';

/**
 * This function get click metrics for a url
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with url metrics
 */
export const getUrlClickMetrics = async (req, res) => {
  try {
    const { urlShortenId } = req.params;

    Metric.aggregate([
    { // match stage to select metrics for a specific shortened url
      '$match': {
        'urlShortenId': mongoose.Types.ObjectId(urlShortenId)
      }
    }, { // facet stage to query results from the last stage without making any queries to db
      '$facet': {
        'byDevice': [{
          '$group': { // group by device
            '_id': '$device',
            'count': {
              '$sum': 1
            }
          }
        }],
        'byLocation': [{
          '$group': { // group by country/location
            '_id': '$country',
            'count': {
              '$sum': 1
            }
          }
        }]
      }
    }])
    .then(docs => res.status(200).json(docs[0]))
    .catch(console.error);

    // const url = await UrlShorten.findOne({
    //   urlSortenId
    // });

    // console.log(url)

    // const clickMetrics = await Metric.countDocuments({ urlSortenId }, function(err, count) {
    //   console.log(count)
    // });
    // console.log(clickMetrics);
    // .populate('urlShortenId')
    // .exec(function (err, messages) {
    //   if (err) throw err;
    //   console.log(JSON.stringify(messages, undefined, 4));
    //   res.status(200).json(messages);
    // });

    // Metric.aggregate(
    //   [
    //     { $match: { "urlSortenId": url } },
    //     {
    //       $group: {
    //         _id: "urlSortenId",
    //         ip: { "$first": "$ip" },
    //         "count": { $sum: 1 },
    //         "totalValue": { "$sum": "$value" }
    //       }
    //     }
    //   ],
    //   function (err, results) {
    //     if (err) throw err;
    //     console.log(JSON.stringify(results, undefined, 4));
    //     }
    // );

    // if (!clickMetrics) {
    // 	return respondWithWarning(res, 404, "No data found");
    // }

    // res.status(201).json({
    // 	success: true,
    //   payload: clickMetrics,
    // });
  } catch (err) {
    console.log(err);
    return respondWithWarning(res, 500, "Server error");
  }
};