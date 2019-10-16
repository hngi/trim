import path from "path";
import UrlShorten from "../models/UrlShorten";

/**
 * This function renders the about page
 * @param {object} req
 * @param {object} res
 * @returns {object} response object with about url
 */
export const aboutPage = (req, res) => {
  return res.status(200).render('about');
};
