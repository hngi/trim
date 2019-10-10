import Url from '../models/UrlShorten';

const getUrlAndEditCount = async (req, res) => {
  try {
    const {
      urlCode
    } = req.params;
    const url = await Url.findOne({
      urlCode
    });

    if (!url) {
      return res.status(404).json({
        status: 'error',
        error: 'Url not found'
      });
    }

    url.click_count += 1;
    await url.save();
    return res.redirect(url.long_url);

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
}

export default getUrlAndEditCount;