import Link from '../models/UrlShorten';
module.exports = {
  redirectLink: async (req, res)=>{
    const {id} = req.params;
    const fondLink = await Link.findOne({urlCode: id})
    if(fondLink){
      const actualLocation = foundLink.long_url
      res.redirect(actualLocation)
    }else{
      res.status(400).json({error: 'Link does not exists'})
    }
  }
}
