import Metric from "../models/metrics";
import path from "path";
import geoip from 'geoip-lite';
import request from 'request';

let geo = geoip.lookup(req.ip);
let key = '2efbe530c80c3e50a76d0e7cbe70d4ec';
let ua = req.headers['user-agent'];
const now = Date.now();
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const month = monthArr[now.getMonth()];
const year = now.getFullYear();
request(`http://api.userstack.com/api/detect?access_key=${key}&ua=${ua}&`, (error,response,body)=>{
if(!error && response.statusCode == 200){
    const data = JSON.parse(body)
}
})
export const getMetric = Metric.create({
    ip: req.ip,
  country: geo.country,
  city: geo.city,
  device: data.device.type,
  browser: data.browser.name,
  visit_month: month,
  visit_year: year
}, (err,metric)=>{
    if(!err){
        console.log(metric)
    }
})
