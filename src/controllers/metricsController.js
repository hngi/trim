import Metric from "../models/Metric";
import { respondWithWarning } from '../helpers/responseHandler';
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
    .then(docs => {
      res.status(201).json({
        success: true,
        payload: docs[0],
      });
    })
  } catch (err) {
    console.log(err);
    return respondWithWarning(res, 404, "No data found");
  }
};