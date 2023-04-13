const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https=require("https");

const app= express(); 

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
 
app.post("/",function(req,res){

    const query = req.body.cityName;
    const appId= "fcfc1bf78d9e9327060d9e2e8c00f2ba";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid="+ appId+"&units="+units;
    
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            var iconImageURL="https://openweathermap.org/img/wn/" +icon+ "@2x.png";
            
            res.write("<h1>The Temp in "+ query+ " is "+ temp +" degrees C.</h1>");
            res.write("<p>The weather is currently<em> "+ desc +"</em>.</p>");
            res.write("<img src="+iconImageURL+ ">");

            res.send();
        
        });
    });
});

app.listen(3000, function(){
    console.log("server started");
})