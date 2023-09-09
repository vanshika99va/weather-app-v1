import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';




function App() {

  const [query,setQueury]= useState({q:"Tokyo"});
  const [units,setUnits]= useState("metric");
  const [weather,setWeather] = useState(null);

  useEffect(()=>{
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location';
      toast.info('Fetching weather for ' + message);
      await getFormattedWeatherData({...query,units})
      .then((data)=>{
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        setWeather(data)
      })
    }
    fetchWeather();
  },[query,units]);

  useEffect(()=>{
    console.log("weather",weather);
    console.log("query",query);
  },[weather,query]);

  const handleQuery = (lat,lon) => {
    if(lon){
      setQueury({lat,lon})
    }
    else{
      setQueury({q:lat})
    }
  }
  const handleUnits = (newUnit) => {
    setUnits(newUnit);
  }

  const formatBackground = () => {
    if(!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units ==='metric' ? 20 : 68
    if (weather.temp <=threshold){
      return 'from-cyan-700 to-blue-700'
    }
    else  return 'from-yellow-700 to orange-700'
    
  }

  
  return (
    
    <div className="app">
      <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} shadow-xl shadow-gray-400`}>
      <TopButtons handleQuery={handleQuery}/>
      <Inputs handleQuery={handleQuery}  handleUnits={handleUnits}/>

      {weather && 
        <div>
        <TimeAndLocation weather={weather}/>
        <TemperatureAndDetails weather={weather}/>
        <Forecast title='Tomorrow' items={weather.tomorrowForecast}/>
        <Forecast title="This Week" items={weather.daily}/>
        </div>
      }
      </div>
      <ToastContainer autoClose={3000} theme='colored' newestOnTop={true}/>

    </div>
  );
}

export default App;



//PROBLEMS:
// - local time changing when metric is changing
// - different time slots for tomorrow
// - get temp for days 
//- e.target.value -vs- e.currentTarget.value
//search button