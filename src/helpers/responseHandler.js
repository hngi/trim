/**
 * Handles all http responses
 * @exports respondWithSuccess
 * @exports respondWithWarning
 */

/**
  * @param  {Object} res
  * @param  {Number} statusCode
  * @param  {String} message
  * @param {Object} additionalFields
  * @returns {Object} null
  */
export const respondWithSuccess = (res, statusCode = 200, message, additionalFields) => {

  return res.status(statusCode).send({ success: true, message, payload: { ...additionalFields } });
}

/**
  * @param  {Object} res
  * @param  {Number} statusCode
  * @param  {String} message
  * @param {Object} additionalFields
  * @returns {Object} null
  */
export const respondWithWarning = (res, statusCode = 500, message, additionalFields) => res
  .status(statusCode).send({ success: false, message, payload: { ...additionalFields } });
