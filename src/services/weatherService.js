import { DateTime } from "luxon";

const API_KEY ="43d15d7b19102b54c7a5ff18095d8e00";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


const getWeatherData =  (infoType, searchParams) =>{
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});
    console.log(url);
    return fetch(url).then((res)=>res.json());
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time : 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);



const formatCurrentWeather = (data) => {
    console.log(data);
    const {
        coord:{lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}
    } = data;

    const {main: details,icon} = weather[0];
    const iconId = icon.slice(0,-1)+'d';

    return {lat, lon, temp, feels_like, temp_min,temp_max,humidity,name,dt,
    country,sunrise,sunset,details,iconId,speed}
}

const formatForcastWeather = (data) =>{
    let timezone  = data.city.timezone;
    const tomorrowForecast = data.list.slice(2,7).map((d)=>{
        return{

            title:formatToLocalTime(d.dt,timezone,'hh:mm a'),
            temp:d.main.temp,
            icon:d.weather[0].icon
        }
    })
    let daily =  data.list;
    daily = daily.slice(1,6).map( d =>{
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp : d.main.temp,
            icon:d.weather[0].icon
        }
    });

    
    return {timezone,daily,tomorrowForecast};
}

const getFormattedWeatherData = async (searchParams) => {
    
    const formattedCurrentWeather = await  getWeatherData('weather',searchParams).then(formatCurrentWeather)

    const {lat,lon} = formattedCurrentWeather;

    const formattedForcastWeather = await getWeatherData('forecast',
        {
            lat,
            lon,
            cnt:"20",
            // exclude:'current,minutely,alerts',
            units: searchParams.units
        }).then((data)=>formatForcastWeather(data))
        // .then((d)=> console.log(d));
        

    return {...formattedCurrentWeather,...formattedForcastWeather};
    // return formattedCurrentWeather;
}

    const iconUrlFromCode = (code) => {
       return `https://openweathermap.org/img/wn/${code}@2x.png`;
    }


export default getFormattedWeatherData;

export {formatToLocalTime,iconUrlFromCode};
