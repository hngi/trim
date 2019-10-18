import request from 'request';
import Click from '../models/Click';

/** Registers a new click on a shortened url in the DB
 * @param  {Object} req
 * @param  {String} urlId
 */
export const updateClickCount = async (req, urlId) => {
  try {
    const res = await getLocationInfo(req.ip);
    const deviceType = getDeviceType(req);

    const newClickData = new Click({
      urlShortenId: urlId,
      publicIp: res.ip,
      location: {
        country: res.country,
        countryCode: res.country_code
      },
      deviceType
    });

    await newClickData.save();
  } catch (msg) {
    throw msg;
  }
};

/** Formats the result from `express-device` package for storage in the DB
 * @private
 * @param  {Object} req
 */
const getDeviceType = (req) => (['tv', 'bot', 'car'].includes(req.device.type) ? 'other' : req.device.type);

/** 
 * Retrieves location info from IPLocate API
 * @private
 * @param  {String} ip
 */
const getLocationInfo = (ip) => (
  new Promise((resolve, reject) => {
    const url = `https://www.iplocate.io/api/lookup/${ip}`;
    request({
      url,
      method: "GET",
      json: true
    }, (error, response, body) => {

      if (response.statusCode === 429) {
        reject('LIMIT_REACHED');
      }

      if (response.statusCode !== 200) {
        reject('FAILED');
      }

      if (typeof body !== 'undefined') {
        resolve(body);
      }
      reject('FAILED');
    });
  })
);