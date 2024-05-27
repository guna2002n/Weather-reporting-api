
import './App.css'

import normal from './assets/weather/50d.png'
import cloud from './assets/weather/03d.png'
import clear from './assets/weather/01d.png'
import broken_clouds from './assets/weather/04d.png'
import rainny from './assets/weather/10d.png'
import heavyrain from './assets/weather/11d.png'
import snow from './assets/weather/13d.png'
import hum from './assets/humidity.webp'
import wind from './assets/wind.jpg'
import { useEffect, useState } from 'react'
function App(props) {
  let weather={
    '01d':normal,'02d':cloud,'03d':cloud,'04d':broken_clouds,'50d':clear,'09d':rainny,'10d':rainny,'11d':heavyrain,'11d':snow
  }
  let [temp,settemp]=useState(0.0)
  let [images, setimage]=useState(normal)
  let [city,setcity]=useState('Bahour')
  let [country,setcountry]=useState(props.country)
  let [lon,setlon]=useState(props.lon)
  let [lat,setlat]=useState(props.lat)
  let [humn,sethum]=useState(props.hum)
  let [winds,setwind]=useState(props.wind)
  let [text_city,settcity]=useState('bahour')
  let [load, setloading]=useState(false);
  let [citynotfound ,setnotfound]=useState(false);
  

  useEffect(function(){search()},[])
  function changecity(e){
    settcity(e.target.value)
  }

  const search=async ()=>
  {
    console.log('cki')
    setloading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text_city}&appid=ac5b066de3b2c8fdc3bca85d8c45a475&units=Metric`;
    try {
      let res=await fetch(url);
      console.log(weather['01d'])
      console.log(res)
     let data=await  res.json()
      //setout(data);
      if(data.cod==='404')
      {
        console.log('error')
      setnotfound(true);
      setlat(0);
      setlon(0);
      setwind(0);
      sethum(0)
      setcity('');
      setcountry('')
      settemp(0)
      setimage(normal)
      return;
      }
      settemp(data.main.temp);
      setcity(data.name);
      setnotfound(false);
      setcountry(data.sys.country);
      sethum(data.main.humidity);
      const data2=data.weather[0].icon;
      setimage(weather[data2]);
      console.log( data2)
      console.log(weather[data2])
      
     // console.log(weather[])
      setlat(data.coord.lat);
      setlon(data.coord.lon);
      setwind(data.wind.speed);
    } catch (error) {
      console.log(error)
    }finally
    {
      setloading(false);
    }
  }
  return (
    <div className="container">
    <div className="textbox">
      <input type="text"value={text_city} required onChange={changecity} name="text_city" id="" />
      <i class="fa-solid fa-magnifying-glass" onClick={search}></i>
    </div>
    <div className="image">
    <img src={images} />
    <p className='error'>{citynotfound?'city not found':''}</p>
    </div>
    
    <div className="temp"> {temp}'C</div>
    {load && <p>Loding...</p>}
    <div className="city">{city}</div>
    <div className="country">{country}</div>
    <div className="location">
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='lon'>Longitude</span>
      <span>{lon}</span>
    </div>
    </div>
    <div className="datacenter">
      <div className="humidity">
      <div className="data_icone">
        <img src={hum} alt="" className='icon' />
      </div>
      <div className="hum icons">
      <div>
      <span>Humidity</span>
      <span>{humn}%</span>
      </div>
      </div>
      </div>
      <div className="windflow">
      <div className="data_icone">
        <img src={wind} alt="" className='icon' />
         </div>
         <div className="win icons">
         <div>
         <span>Wind</span>
         <span>{winds}Km/hr</span>
         </div>
         </div>
         </div>
      
    </div>
    </div>
  )
}

export default App
