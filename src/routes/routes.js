import {respondWithWarning} from '../helpers/responseHandler';
import { renderLandingPage, trimUrl, deleteUrl } from "../middlewares/middlewares";

export const initRoutes = (app) => {
	app.get('/', renderLandingPage);

	app.post('/api/clip', trimUrl);

	app.delete('/api/clip/:id', deleteUrl);

	app.all('*', (req, res) => respondWithWarning(res, 404, "Page not found"));
};
