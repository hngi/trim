import {respondWithWarning} from '../helpers/responseHandler';
import { 
	renderLandingPage, validateOwnDomain, urlAlreadyTrimmedByUser, stripUrl
} from "../middlewares/middlewares";
import { getUrlAndUpdateCount, trimUrl, deleteUrl, redirectUrl } from '../controllers/urlController';

export const initRoutes = (app) => {
	app.get('/', renderLandingPage);

	app.post('/api/trim', stripUrl, validateOwnDomain, urlAlreadyTrimmedByUser, trimUrl);

	app.delete('/api/trim/:id', deleteUrl);

	app.get('/api/trim/:id', getUrlAndUpdateCount, redirectUrl);

	app.all('*', (req, res) => respondWithWarning(res, 404, "Page not found"));
}
