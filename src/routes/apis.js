import {
  fetchLinks,
  validateCookie,
} from "../middlewares/middlewares";

export const apis = app => {
  app.get("/api/fetch/links", fetchLinks);
};