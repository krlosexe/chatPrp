const express         = require('express')
const app             = express()
const jwt             = require('jsonwebtoken')
const config          = require('../config/config')

app.set('key', config.key);


const middlewareJwt = express.Router();
middlewareJwt.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, app.get('key'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
});


module.exports = middlewareJwt;

