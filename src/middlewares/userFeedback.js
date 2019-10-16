import path from "path";
import UrlShorten from "../models/UrlShorten";

export const userFeedback = (req, res) => {
    return res.status(200).render('feedback');
};
