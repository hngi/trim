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
