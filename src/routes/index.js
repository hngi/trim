import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';

const routes = (app) => {

  // add all major routes here

  // index route
  const api = '/api/v1';
  app.get('/', (req, res) => respondWithSuccess(res, 200, {
    message: 'Welcome to Way Farer',
  }));
  // invalid url response will go here
};

export default routes;