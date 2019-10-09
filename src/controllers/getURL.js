import Url from '../models/UrlShorten';

const getUrlAndEditCount = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.urlCode });
    if (url) {
      url.click_count += 1;
      await url.save();
      return res.redirect(url.long_url);
    } else {
      return res.status(404).json({  status: 'error', error: 'Url not found' });
    }
  } catch (error) {
    return res.status(500).json({  status: 'error', error: error.message });
  }
}

export default getUrlAndEditCount;
