const urlRegex = require('url-regex');
const validator = require('express-validator');

let url;
let form;
let db;

export const inputFormValidation = [
  validator
    .body("url")
    .exists(true)
    .withMessage("url must be provided.")
];

function checkInput(form, url, db) {
   const clippedUrl = urlRegex({ url: true, url.length: <= 5 }).test(url); 	
   const isValidUrl = urlRegex({ exact: true, strict: false }).test(url);
  if (!isValidUrl) return res.status(400).json({ error: 'Url is not valid.' });
  if(clippedUrl) {
  	 for( const clippedUrl in db ) {
  		return res.status(401).json({ error: 'Clipped url is already in the database' });
  
  	} 
  }

}