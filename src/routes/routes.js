import { 
	  renderLandingPage, validateOwnDomain, validateCookie, urlAlreadyTrimmedByUser, stripUrl
} from "../middlewares/middlewares";
import { getUrlAndUpdateCount, trimUrl, deleteUrl, redirectUrl } from '../controllers/urlController';

export const initRoutes = (app) => {
	  app.get('/', validateCookie, renderLandingPage);

	app.post('/api/trim', stripUrl, validateOwnDomain, urlAlreadyTrimmedByUser, trimUrl);

	app.post('/api/trim', trimUrl); //Generates a new trim url if checkUrl didn't find an existing one.

	app.delete('/api/trim/:urlCode', deleteUrl); //Delete function has been dropped, but I'm leaving this here anyway. You never know...

	app.get('/:urlCode', redirectUrlAndUpdateCount); //Reverted url parameter back to urlCode to match the database schema.

	app.all('*', (req, res) => (res.status(404).render('../src/views/error')));
}
