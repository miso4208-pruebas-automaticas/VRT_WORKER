'use strict'
var express = require('express')
var router = express.Router();
var randomService = require('../services/random.srv.js');

router.post('/random',function(req,res){
    console.log("randommm"+ JSON.stringify(req.body))
    
    let data={
        'app' : req.body.app,
        'number' : req.body.number,
        'code': req.body.code,
        'path_project': req.body.path_project
    }
    randomService.generateRandom(data, function(apps){
        res.statusCode = 200;
        res.send({ status: "OK" });
    },function(err){
        res.statusCode = 404;
        res.send(err);
        
    })
    return res;
});

module.exports = router;