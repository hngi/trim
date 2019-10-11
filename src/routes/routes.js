import { 
	  renderLandingPage, validateOwnDomain, validateCookie, urlAlreadyTrimmedByUser, stripUrl
} from "../middlewares/middlewares";
import { getUrlAndUpdateCount, trimUrl, deleteUrl, redirectUrl } from '../controllers/urlController';

export const initRoutes = (app) => {
	  app.get('/', validateCookie, renderLandingPage);

	app.post('/api/trim', stripUrl, validateOwnDomain, urlAlreadyTrimmedByUser, trimUrl);

	app.delete('/api/trim/:id', deleteUrl);

	app.get('/api/trim/:id', getUrlAndUpdateCount, redirectUrl);

	app.all('*', (req, res) => (res.status(404).render('../src/views/error')));
}
