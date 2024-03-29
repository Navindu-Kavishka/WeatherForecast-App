
const timeE1 = document.getElementById("time");
const dateE1 = document.getElementById("date");




const days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Satureday'];
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];

const API_KEY='ac3dfa207a7a62f68fef2f066e07e25e';

setInterval(()=>{
    const time = new Date();
    const month= time.getMonth();
    const date= time.getDate();
    const day= time.getDay();
    const hour= time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12? "PM" : "AM";

    const minutesWithLeadingZero = (minutes < 10 ? '0' : '') + minutes;
    const hoursIn12HrFormatWithLeadingZero = (hoursIn12HrFormat < 10 ? '0' : '') + hoursIn12HrFormat;
    const dateWithleadingZero = (date < 10 ? '0' : '') + date;


  timeE1.innerHTML = hoursIn12HrFormatWithLeadingZero + ':' +minutesWithLeadingZero+' ' +`<span id="am-pm">${ampm}</span>`

  dateE1.innerHTML = days[day] + ', ' +dateWithleadingZero+' ' +months[month]
}, 1000);

getWeatherData();

let latitude;
let longitude;

function getWeatherData () {
    navigator.geolocation.getCurrentPosition(showLocation);

    
}

function showLocation(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    currentWeather(latitude+ "," + longitude);
    forecastData(latitude+ "," + longitude);
    reportData(latitude+ "," + longitude);
}



document.getElementById("searchBtn").addEventListener("click",()=>{
    //console.log("done");
    const searchVal=document.getElementById("searchTxt").value;
   
    let reop ={
        method:'GET'
    };
    
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=8e26f59da15a4d749df61737240203&q=${searchVal}&days=7`,reop)
    .then(responce=>responce.json())
    .then(data=>{
        
        //current Weather
        currentWeather(searchVal);

        // Forcast
        forecastData(searchVal);
        
        // 7 days histoty weather report
        reportData(searchVal);

        





    })
})



function currentWeather (searchVal){
    let reop ={
        method:'GET'
    };
    //let searchVal=document.getElementById("searchTxt").value;
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=8e26f59da15a4d749df61737240203&q=${searchVal}&days=7`,reop)
    .then(responce=>responce.json())
    .then(data=>{
        console.log(data);
        document.getElementById("cityName").innerHTML=data["location"]["name"];
        document.getElementById("countryName").innerHTML = data["location"]["country"];
        document.getElementById("latitude").innerHTML=data["location"]["lat"];
        document.getElementById("longitude").innerHTML=data["location"]["lon"];
        document.getElementById("uv").innerHTML=data["current"]["uv"];
        //document.getElementById("dateTime").innerHTML=data["current"]["localtime"];
        document.getElementById("tempLbl").innerHTML=data["current"]["temp_c"]+["°C"];
        document.getElementById("textLbl").innerHTML=data["current"]["condition"]["text"];
        document.getElementById("img").src=data["current"]["condition"]["icon"];
        //document.getElementById("weather").innerHTML=data.current.weather[0].description;
        document.getElementById("windLbl").innerHTML=data["current"]["wind_kph"]+[" km/h"];
        document.getElementById("humidityLbl").innerHTML=data["current"]["humidity"]+["%"];
    }) 
}

function forecastData(searchVal){
    let reop ={
        method:'GET'
    };
    //let searchVal=document.getElementById("searchTxt").value;
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=8e26f59da15a4d749df61737240203&q=${searchVal}&days=7`,reop)
    .then(responce=>responce.json())
    .then(data=>{
        const dateForDate = new Date(`${data.forecast.forecastday[0].date}`);
        let currentDay = new Date(dateForDate);

        for (let i = 0; i < 7; i++) {
          const splittedDate = currentDay.toISOString().split("T")[0];

          fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=8e26f59da15a4d749df61737240203&q=${searchVal}&days=7&dt=${splittedDate}&aqi=homagama&alerts=yes`
          )
            .then((res) => res.json())
            .then((data) => {
                //console.log(data);

                document.getElementById(`icon-${i+1}`).src = `${data.forecast.forecastday[0].day.condition.icon}`;
                document.getElementById(`forecast-day-${i+1}`).innerHTML = `${data.forecast.forecastday[0].date}`;
                document.getElementById(`forecast-temp-${i+1}`).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} °C`;

            })
            .catch(error => {
                console.error("Error",error);
            });
            currentDay.setDate(currentDay.getDate() + 1);
            
        }

        
        

    }) 
}


function reportData(searchVal){
    let reop ={
        method:'GET'
    };
    
    //let searchVal=document.getElementById("searchTxt").value;
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=8e26f59da15a4d749df61737240203&q=${searchVal}&days=7`,reop)
    .then(responce=>responce.json())
    .then(data=>{
        const dateFORdate = new Date(`${data.forecast.forecastday[0].date}`);
        let currentday = new Date(dateFORdate);
        //Reports
        for (let i = 7; i > 0; i--) {
            //console.log("test2");

            const splittedDate = currentday.toISOString().split("T")[0];
                //console.log(splittedDate);
            fetch(`https://api.weatherapi.com/v1/history.json?key=8e26f59da15a4d749df61737240203&q=${searchVal}&dt=${splittedDate}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                document.getElementById(`img-${i}`).src = `${data.forecast.forecastday[0].day.condition.icon}`;
                document.getElementById(`report-day-${i}`).innerHTML = `${data.forecast.forecastday[0].date}`;
                document.getElementById(`report-temp-${i}`).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} °C`;

            })
            .catch(error => {
                console.error("Error",error);
            });
            currentday.setDate(currentday.getDate() - 1);
            
        }
    }) 
}



