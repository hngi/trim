// import { renderLandingPage, trimUrl, deleteUrl } from "../middlewares/middlewares";

// export default initRoutes = (app)=> {
// 	app.get('/', (req, res)=> renderLandingPage(req, res));

// 	app.post('/api/clip', (req, res)=> trimUrl(req, res));

// 	app.delete('/api/clip/:id', (req, res)=> deleteUrl(req, res));
// };
import express from 'express';
import getUrlAndEditCount from '../controllers/getURL';

const router = express.Router();

router.get('/:urlCode', getUrlAndEditCount);

export default router;
