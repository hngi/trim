<<<<<<< HEAD
import { renderLandingPage, trimUrl, deleteUrl } from "../middlewares/middlewares";
import {Router} from 'express'
import linkController from '../controllers/link';
const router = Router()

export default initRoutes = (app)=> {
	app.get('/', (req, res)=> renderLandingPage(req, res));

	app.post('/api/clip', (req, res)=> trimUrl(req, res));

	router.route('/api/clip/:id', linkController.redirectLink)

	app.delete('/api/clip/:id', (req, res)=> deleteUrl(req, res));
};
=======
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
>>>>>>> c6ec862c873be1483379a022562942645bf98fd5
