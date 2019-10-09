import { renderLandingPage, trimUrl, deleteUrl } from "../middlewares/middlewares";
import redirectUrl  from "../controllers/redirect-url";
import express from 'express';
import getUrlAndEditCount from '../controllers/getURL';

export default initRoutes = (app) => {
	app.get('/', (req, res) => renderLandingPage(req, res));

	app.post('/api/clip', (req, res)=> trimUrl(req, res));

	app.get('/api/clip/:id', getUrlAndEditCount, (req, res) => redirectUrl(req, res));
	app.delete('/api/clip/:id', (req, res) => deleteUrl(req, res));

	app.all('*', (req, res) => respondWithWarning(res, 404, "Page not found"));
}
