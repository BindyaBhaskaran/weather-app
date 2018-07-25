const express = require('express'); //should be required first. 
const request = require('request');
const bodyParser = require('body-parser'); //middle-ware

let app = express()
//const ejs = require('ejs'); //middle-ware
const PORT = process.env.PORT


app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine','ejs')  //set ejs as tempplate engine


const apiKey = 'c34f5253865ef668227184c10cff9e0c';

app.get('/',function(req,res){ // '/' -> root url
    res.render('index',{weather:null,error:null}); //no extension required.

})

app.post('/',function(req,res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) { //If successful, our required data will be present in body. You just need to fetch.
        if(err){
            res.render('index', {weather:null, error:'Error! Please try again.'}); //when user has not entered anything
        }else{ //when user enters gibberish data
            let weather = JSON.parse(body);
            if(weather.main == undefined){ // use == when checking for undefined.
                res.render('index', {weather:null, error:'Error! Please try again.'});
            } else{
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index',{weather:weatherText, error:null})
            }

        }

});
})

app.listen(PORT, function(err){ //3000 is the default port for express
    if (err){
        console.log(err);
    }
    else{
        console.log("App listening on port 3000");
    }
});