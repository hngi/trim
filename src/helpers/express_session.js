const express = require('express')
const app = express()
const session = require('express-session')

app.use(session({
    secret:'urlShortner',
    saveUninitialized:true,
    resave:true
}))
var userId;
    app.get('/',(req,res)=>{
        userId = req.sessionID
     })



module.exports=userId