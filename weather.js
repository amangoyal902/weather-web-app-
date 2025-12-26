const cityName = document.querySelector(".weather_city");
const dateTime = document.querySelector(".weather_date_time")
const w_forecast = document.querySelector(".weather_forecast")
const w_icon = document.querySelector(".weather_icon")
const w_temprature = document.querySelector(".weather_temperature")
const w_minTemp = document.querySelector(".weather_min")
const w_maxTemp = document.querySelector(".weather_max")
let city_name = document.querySelector(".city_name")
const btn = document.querySelector(".search_btn")

let w_feelsLike = document.querySelector(".weather_feelsLike")
let w_humidity = document.querySelector(".weather_Humidity")
let w_wind = document.querySelector(".weather_wind")
let w_pressure = document.querySelector(".weather_pressure")

city= "jaipur"


const convertCode = (code) => {
 return new Intl.DisplayNames([code], { type: 'region' }).of(code);
    
}
const timeFormater = (timeStamp) => {
    const timestamp = 1759437261;  // from API
const date = new Date(timestamp * 1000); // multiply by 1000 (JS uses ms)


 return date.toUTCString() 


}

const searchData = (e) => {
    e.preventDefault();
    console.log(city_name.value);
    city = city_name.value;
    
    
    getWeatherData();
    city_name.value = "";
}
    const getWeatherData = async () => {
      
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f4a3dca9a16b051c6c363214e1e5599`
        try{
          const res = await fetch(apiUrl)       
          const data =  await res.json();
          console.log("data",data);
         const {main,name,weather,wind,sys,dt } = data;
         cityName.innerHTML = `${name},${convertCode(sys.country)}`
         dateTime.innerHTML = `${timeFormater(dt)}`
         
         w_forecast.innerHTML = `${weather[0].main}`
         w_icon.innerHTML = `<img src = "http://openweathermap.org/img/w/${weather[0].icon}.png" alt = "weather icon">`
         w_temprature.innerHTML = `${main.temp}&#176`
         w_minTemp.innerHTML = `min: ${main.temp_min.toFixed()}&#176`
         w_maxTemp.innerHTML = `max: ${main.temp_max.toFixed()}&#176`

         w_feelsLike.innerHTML = `${main.feels_like}&#176`
         w_humidity.innerHTML = `${main.humidity}%`
         w_wind.innerHTML = `${wind.speed}m/s`
         w_pressure.innerHTML = `${main.pressure}hPa`

          
        }
        catch(error){
           console.log(error);
        
        }
    }

btn.addEventListener('click',searchData);
window.addEventListener('load', getWeatherData);
