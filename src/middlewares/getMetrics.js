import Metric from "../models/Metric";
import geoip from 'geoip-lite';

export const getMetric = (urlShortenId, { ip, device }) => {
  try {
    ip = '41.190.2.1';
    const geo = geoip.lookup(ip);
    const device_type = getDeviceType(device);

    Metric.create({
      urlShortenId,
      ip,
      country: geo.country,
      city: geo.city,
      device: device_type,
    });
  } catch (error) {
    console.log(error);
  }
};


/** Formats the result from `express-device` package for storage in the DB
 * @private
 * @param  {Object} device
 */
const getDeviceType = (device) => { 
  return (['tv', 'bot', 'car'].includes(device.type) ? 'other' : device.type);
};