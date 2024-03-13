





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
})