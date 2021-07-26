//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const dotenv = require('dotenv').config();

const app = express();

app.use(express.static("public" ));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

//return values from the localhost:3000
app.post("/", function(req, res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  // https://mailchimp.com/developer/api/marketing/lists/batch-subscribe-or-unsubscibe/

  //data Object in mailchimp consists of email_address, status, merge_fields
  var data = {//object
      members: [//array
        {
        email_address: email,
        status: "subscribed",
        merge_fields:{
           //https://us2.admin.mailchimp.com/lists/settings/merge-tags?id=956150
           FNAME: firstname, //FNAME is a property from MailChimp
           LNAME: lastname   //LNAME is a property from MailChimp
         }
       }
       ]
     };
    //convert this data into string in a format of JSON
     const jsonData = JSON.stringify(data);

     //const url = "https://usX.api.mailchimp.com/3.0/lists
     const url = "https://us2.api.mailchimp.com/3.0/lists/ef2399df3e"; //listID ef2399df3e | X=2 at from "us2" from api key
     const options = {
       method: "POST",
       auth: process.env.DB_AUTH_API
     }
     const request = https.request(url, options, function(response){

       //Response message whether it's successful or unsuccessful
       if(response.statusCode === 200){
         res.sendFile(__dirname + "/success.html");
       }else{
         res.sendFile(__dirname + "/failure.html");
       }
        response.on("data", function(data){
          console.log(JSON.parse(data));
        })

     });
     request.write(jsonData);
     request.end();

});
//when the page is failed, it will redirect to the signup.html again
app.post("/failure", function(req, res){
  res.redirect("/");
});

//run heroku or on localhost
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

