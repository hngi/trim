const validate = require('../middlewares/validate');
const { check } = require('express-validator');
import {
  aboutPage,
  renderLandingPage,
  validateOwnDomain,
  validateCookie,
  urlAlreadyTrimmedByUser,
  stripUrl,
  customUrlExists
} from "../middlewares/middlewares";
import {
  getUrlAndUpdateCount,
  trimUrl,
  deleteUrl,
  redirectUrl
} from "../controllers/urlController";
import { getUrlClickMetrics } from '../controllers/metricsController';

export const initRoutes = app => {
  app.get("/", validateCookie, renderLandingPage);
  app.get("/about", (req, res) => res.status(200).render("about"));
  app.get("/docs", (req,res)=>res.status(200).redirect("https://documenter.getpostman.com/view/4447136/SzYaWe6j?version=latest"));
   app.post("/", [check('long_url').isString().not().isEmpty().withMessage('Long url cannot be empty'),
      check('expiry_date').optional().matches(/([12]\d{3}[-\/](0[1-9]|1[0-2])[-\/](0[1-9]|[12]\d|3[01]))/).withMessage('Date format has to be yyyy-mm-dd or yyyy/mm/dd')]
            ,validate, validateOwnDomain, stripUrl, urlAlreadyTrimmedByUser, customUrlExists, trimUrl);
  app.get("/:id", getUrlAndUpdateCount);
  app.get('/metrics/:urlShortenId', getUrlClickMetrics);
  app.all("*", (req, res) => res.status(404).render("error"));
};
