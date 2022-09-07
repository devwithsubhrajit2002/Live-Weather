const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
  
})

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "fd5387f68577a3e179839e673e515278";
    const unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){

            var weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const descrip = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temparature at " + query + " is " + temp + " degree Celcius.</h1>");
            res.write("<h2>The weather condition is " + descrip + "</h2>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })

})


app.listen(3000, function(){
    console.log("Server has started.");
})