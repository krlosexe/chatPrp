const express         = require('express')
const app             = express()
const bcrypt          = require("bcrypt");
const client_mongo    = require('../config/database.js')
const jwt             = require('jsonwebtoken')
const config          = require('../config/config')
const mongo           = client_mongo()
const requesting      = require('request');

app.set('key', config.key);

exports.store = function(request, response) {

     console.log(request.file)
     

    const dbo = mongo.db("prp");

    const lines  =  request.body.lines.split(',')
    var today    = new Date();
    var date     = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time     = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    var dataTime = `${date} ${time}`

     const data = {
        "post"      : request.body.post,
        "lines"     :  lines,
        "create_at" :  dataTime,
        "file"      : "upload/" + request.file.originalname
     }

    dbo.collection("posts").insertOne(data, function(err, res) {
         console.log("1 document inserted");
     });
     



     const form = {
        form:{
            "lines" : lines
        }
      }
     requesting.post('http://192.168.1.120:8000/api/notification/post',form,function(err,res,body){
        console.log(body)
     });



    setTimeout(() => {
        response.status(200).json({"success" : data})
    }, 2000)
    
};





exports.get = function(request, response) {

   const dbo = mongo.db("prp");

   var   data  = []
   const query = {lines : request.params.name_line}

   dbo.collection("posts").find(query).toArray(function(err, result) {
        data = result
        response.status(200).json(data)

   });


   
   
};


