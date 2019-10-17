import {
  aboutPage,
  renderLandingPage,
  validateOwnDomain,
  validateCookie,
  urlAlreadyTrimmedByUser,
  stripUrl
} from "../middlewares/middlewares";
import {
  getUrlAndUpdateCount,
  trimUrl,
  deleteUrl,
  redirectUrl
} from "../controllers/urlController";

export const initRoutes = app => {
  app.get("/", validateCookie, renderLandingPage);
  app.post("/", stripUrl, validateOwnDomain, urlAlreadyTrimmedByUser, trimUrl);
  app.get("/about", aboutPage);

  app.get("/:id", getUrlAndUpdateCount);
  app.all("*", (req, res) => res.status(404).render("error"));
};
