const express = require("express");
const app = express();
const { translate } = require('bing-translate-api');
const redis = require('redis');

const map1 = require("./Map") ;
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: false }))

const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);


async function getTranslation(req,res,next){
    var text = req.body.text ;
    var toTranslate = req.body.toTranslate

    var obj = {
        text : text,
        toTranslate : toTranslate
    }
     var str =  JSON.stringify(obj)

     const ar = map1.get(toTranslate);
     if(ar!=null)
     precaching(text,ar);

    try{  
     translate(text, null, toTranslate , true).then(data => {
        
        client.setex(str,1800,data.translation);


     res.json(data.translation);
     }).catch(err => {
     console.error(err);
  });
  } catch(err){
        console.error(err);
        res.status(500)
    }
    
   
}


async function cache(req,res,next){
    var text = req.body.text ;
    var toTranslate = req.body.toTranslate;

    var obj = {
        text : text,
        toTranslate : toTranslate
    }
     var str =  JSON.stringify(obj);

     client.get(str,(err,data)=>{
         if(err)
         throw err;

         if(data!=null)
         res.json(data);
         else
         next();
     })
    
}

function precaching(text,ar){

    ar.map(x=>{
        var obj = {
            text : text ,
            toTranslate : x
        }
        var str =  JSON.stringify(obj);
          
            translate(text, null, x , true).then(data => {
               client.setex(str,1800,data.translation);
            }).catch(err => {
            console.error(err);
         });

    })

}


app.get("/translate", cache , getTranslation)





app.listen(3000,()=>{
    console.log("SERVER UP AND RUNNING ")
})

