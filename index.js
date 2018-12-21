const express = require("express");
const bodyparser=require('body-parser');
const mongoose= require('mongoose');
const cloudinary= require('cloudinary');
var multer  =   require('multer');
// Set Expesss App

const app=express();
// connect to mongo db

 /*var storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname);
    }
});*/
 var imageFilter = function(req, file, cb){
    //accept image files only
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};

mongoose.connect('mongodb://Admin:admin12@ds211083.mlab.com:11083/registration');
mongoose.Promise=global.Promise;
app.use(bodyparser.json());

//Cloudnary api 
cloudinary.config({ 
    cloud_name: 'del7jhjt5', //Gaurav's cloud name
    api_key: '738963556285972', 
    api_secret: 'im05JW-nNMjnMAFvCVA6TlZKYAg' 
  });
  cloudinary.v2.uploader.upload("screen.png", function(result,error) {
      console.log(result, error);
});
  
// using routes .js
app.use('/api',require('./routes/api'));
//Handle errors
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
}) ;
// Listen for request 
app.listen(process.env.port||3000,function(){
    console.log("Listening");
});