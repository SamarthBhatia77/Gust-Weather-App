'use client'
import React, { use } from "react";
import { useState, useEffect } from "react";
export default function WeatherApp() {
    const defaultCities = [
    "Paris", "London", "Tokyo", "New York", "Sydney",
    "Rome", "Berlin", "Dubai", "Moscow", "Toronto",
    "Madrid", "Beijing", "Istanbul", "Seoul", "Bangkok",
    "Los Angeles", "Barcelona", "Singapore", "Lisbon", "Prague",
    "Vienna", "Cairo", "Mumbai", "Cape Town", "Rio"
  ];

  const [cityArr, setCityArr] = useState(defaultCities);

  useEffect(() => {
    const rawArr = localStorage.getItem("place");
    if (rawArr) {
      setCityArr(JSON.parse(rawArr));
    }
  }, []); 




  const [cityName,setCityName]=useState("");
  const [visited,setVisited]=useState(false);
  const [latitude,setLatitude]=useState(0.0);
  const [temp,setTemp]=useState(0.0);
  const [longitude,setLongitude]=useState(0.0);
  const [name,setName]=useState("");
  const [addPlace,setAddPlace]=useState("");
  const [windSpeed,setWindSpeed]=useState(0.0);
  const [desc,setDesc]=useState("");
  const [icon, setIcon] = useState("");


  const APIkey="";
  async function FetchData(city) {
    try {
      // Step 1: Get city coordinates
      const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;
      const geoResponse = await fetch(geoURL);
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        alert("City not found! Try again");
        return;
      }

      const { lat, lon } = geoData[0];

      // Step 2: Use lat/lon to fetch weather data
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
      const weatherResponse = await fetch(weatherURL);
      const weatherData = await weatherResponse.json();

      console.log(weatherData); // Use this data to update UI
      setLatitude(weatherData.coord.lat);
      setLongitude(weatherData.coord.lon);
      setTemp(weatherData.main.temp);
      setWindSpeed(weatherData.wind.speed);
      setDesc(weatherData.weather[0].description);
      setIcon(weatherData.weather[0].icon);


    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data.");
    }
  }
  const submitRequest=()=>{
    FetchData(cityName);
    setVisited(true);
    setName(cityName);
    setCityName("");
  }
  const buttonFetch=(city)=>{
    setCityName(city);
    FetchData(city);
    setVisited(true);
    setName(city);
  }
  const handleAddPlace=()=>{
    const updated = [addPlace, ...cityArr];
    setCityArr(updated);
    localStorage.setItem("place", JSON.stringify(updated));
    setAddPlace("");
  }
  return (
    <div className="flex flex-col justify-center mt-4 ml-5">
      <div className="bg-black/30 p-4 -mt-4 -ml-6 border border-black items-center align-center">
      <h1 className="text-4xl font-bold text-white ">Gust ⛅</h1>
      </div>
      <div className="flex lg:justify-between ">
      <div id="container" className="flex flex-col shadow-lg bg-white/30 backdrop-blur-md border border-black mt-10 w-[500px] pb-8 rounded-[20px] lg:pb-8 p-7">
        <div className="flex gap-7 items-center justify-center">
          <input placeholder="Enter place name" className="border border-black focus:outline-none  bg-white w-[350px] p-2 rounded-md mt-6"
            value={cityName} onChange={(e)=>setCityName(e.target.value)} />
          <button className="bg-[#ccc] px-3 py-2 rounded-md mt-6 border border-black cursor-pointer hover:bg-[#E8E8E8] transition 0.3s ease-in-out hover:scale-110"
            onClick={submitRequest}>🔎</button>
        </div>
        {visited? (
        <div className="flex flex-col items-center justify-center align-center">
          <p className="mt-10 text-5xl font-bold font-mono">{name}</p>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Weather Icon"
            className="w-20 h-20 mt-4"
          />
          <p className="mt-5  mb-6 text-[23px]">Status: {desc}</p>
          <p className="mt-3">📌 Latitude:  {latitude} , Longitude:  {longitude}</p>
          <p className="mt-5 font-bold text-[20px]">🌡️ Feels like {temp}°c outside</p>
          <p className="mt-5  text-[20px]">💨 Wind speed : {windSpeed} km/h</p>
          
        </div>
        ) : <p className="mt-40 ml-8 text-2xl text-black">Search to view live weather details !</p>}
      </div>
      <div className="flex flex-col mr-20">
  <div id="container" className="  border border-black bg-white/30 backdrop-blur-md shadow-lg mt-10 w-[700px] p-8 rounded-[20px]">
  <p className="text-2xl font-bold mb-5">Famous Locations 🌟</p>
  <div className="grid grid-cols-5 gap-4">
    {cityArr.map((city, idx) => (
      <button
        key={idx}
        onClick={() => buttonFetch(city)}
        className="bg-[#ccc] py-2 px-3 rounded border shadow-md border-black hover:bg-[#8c8c8c] hover:text-white transition cursor-pointer"
      >
        {city}
      </button>
    ))}
  </div>
  <input type="text" placeholder="Add new Place"value={addPlace} className="border border-black focus:outline-none  bg-white w-[350px] p-2 rounded-md mt-6 mr-6"
   onChange={(e)=>setAddPlace(e.target.value)}></input>
   <button className="bg-[#ccc] px-3 py-2 rounded-md mt-6 border border-black cursor-pointer hover:bg-[#E8E8E8] transition 0.3s ease-in-out hover:scale-110"
    onClick={handleAddPlace}>➕</button>
  </div>
  </div>

      </div>
    </div>
  );
}
