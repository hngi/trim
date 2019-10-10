const respondWithWarning = require('../helpers/responseHandler');
const { 
	renderLandingPage,
	trimUrl,
	deleteUrl,
	redirectUrlAndUpdateCount
} = require("../middlewares/middlewares");

const initRoutes = (app) => {
	app.get('/', renderLandingPage);

	app.post('/api/trim', trimUrl);

	app.delete('/api/trim/:urlCode', deleteUrl); //Delete function has been dropped, but I'm leaving this here anyway. You never know...

	app.get('/:urlCode', redirectUrlAndUpdateCount); //Reverted url parameter back to urlCode to match the database schema.

	app.all('*', (req, res) => respondWithWarning(res, 404, "Page not found"));
};

module.exports = initRoutes;
