
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


  timeE1.innerHTML = hoursIn12HrFormat + ':' +minutes+' ' +`<span id="am-pm">${ampm}</span>`

  dateE1.innerHTML = days[day] + ', ' +date+' ' +months[month]
}, 1000);

getWeatherData();
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success)=> {
        console.log(success);

        let {latitude, longitude} = success.coords;

        fetch (`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
          
        })
    })
}





document.getElementById("searchBtn").addEventListener("click",()=>{
    console.log("done");

    let searchVal=document.getElementById("searchTxt").value;
    let reop ={
        method:'GET'
    };
    
    fetch(`http://api.weatherapi.com/v1/current.json?key=8e26f59da15a4d749df61737240203&q=${searchVal}`,reop)
    .then(responce=>responce.json())
    .then(data=>{
        console.log(data);
        document.getElementById("cityName").innerHTML=data["location"]["name"];
        document.getElementById("countryName").innerHTML = data["location"]["country"];
        document.getElementById("latitude").innerHTML=data["location"]["lat"];
        document.getElementById("longitude").innerHTML=data["location"]["lon"];
        //document.getElementById("dateTime").innerHTML=data["current"]["localtime"];
        document.getElementById("tempLbl").innerHTML=data["current"]["temp_c"]+["°C"];
        document.getElementById("textLbl").innerHTML=data["current"]["condition"]["text"];
        document.getElementById("img").src=data["current"]["condition"]["icon"];
        //document.getElementById("weather").innerHTML=data.current.weather[0].description;
        document.getElementById("windLbl").innerHTML=data["current"]["wind_kph"]+[" km/h"];
        document.getElementById("humidityLbl").innerHTML=data["current"]["humidity"]+["%"];
        //document.getElementById("uv").innerHTML=data.current.uvi;
        document.getElementById("sunrise").innerHTML=data.current.sunrise;
        document.getElementById("sunset").innerHTML=data.current.sunset;
    })



    // 5 days


    


})