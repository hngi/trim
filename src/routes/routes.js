import {respondWithWarning} from '../helpers/responseHandler';
import { renderLandingPage, trimUrl, deleteUrl } from "../middlewares/middlewares";
import { redirectUrl }  from "../controllers/redirect-url";
import getUrlAndEditCount from '../controllers/getURL';

export const initRoutes = (app) => {
	app.get('/', renderLandingPage);

	app.post('/api/clip', trimUrl);

	app.delete('/api/clip/:id', deleteUrl);

	app.get('/api/clip/:id', getUrlAndEditCount, redirectUrl);

	app.all('*', (req, res) => respondWithWarning(res, 404, "Page not found"));
}
