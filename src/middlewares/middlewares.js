const renderLandingPage = require('./renderLandingPage');
const checkUrl  = require('./check-url');
const trimUrl  = require('./trim-url');
const deleteUrl = require('./delete-url');
const redirectUrlAndUpdateCount = require('./redirect');

module.exports = { renderLandingPage, checkUrl, trimUrl, deleteUrl, redirectUrlAndUpdateCount };