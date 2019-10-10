import {respondWithWarning} from '../helpers/responseHandler';
import { renderLandingPage, checkUrl } from "../middlewares/middlewares";
import { getUrlAndUpdateCount, trimUrl, deleteUrl, redirectUrl } from '../controllers/urlController';

export const initRoutes = (app) => {
	app.get('/', renderLandingPage);

	app.post('/api/trim', checkUrl, trimUrl);

	app.delete('/api/trim/:id', deleteUrl);

	app.get('/api/trim/:id', getUrlAndUpdateCount, redirectUrl);

	app.all('*', (req, res) => respondWithWarning(res, 404, "Page not found"));
}
