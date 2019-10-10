import UrlShorten from "../models/UrlShorten.js";

export const redirectUrl = async (req, res) => {
  const url = await UrlShorten.find({ urlCode: req.params.id });
  if (!url) {
    return res.status(401).json({ msg: "Invalid link" });
  }
  longUrl = await url.longUrl;
  res.redirect(longUrl);
};