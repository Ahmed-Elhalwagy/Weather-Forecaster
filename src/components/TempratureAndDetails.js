import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";

function TempratureAndDetails({ weatherData }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center  text-cyan-300 text-xl">
        <p>{weatherData.details}</p>
      </div>
      <div className="flex justify-between items-center py-3">
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt="clear"
          className="w-20"
        />
        <h2 className="font-poppins font-medium text-5xl text-white">
          {weatherData.temp?.toFixed()}°
        </h2>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center">
            <span className="text-white font-light">
              <UilTemperature size={18} className="mr-1" />
            </span>
            <p className="text-white font-extralight text-sm">
              Real felt:
              <span className="font-medium ml-1">
                {weatherData.feels_like?.toFixed(0)}°
              </span>
            </p>
          </div>
          <div className="flex flex-row justify-center items-center space-y-2 ">
            <span className="text-white font-light">
              <UilTear size={18} className="mr-1" />
            </span>
            <p className="text-white font-extralight text-sm">
              Humidity:
              <span className="font-medium ml-1">{weatherData.humidity}%</span>
            </p>
          </div>
          <div className="flex flex-row justify-center items-center ">
            <span className="text-white font-light">
              <UilWind size={18} className="mr-1" />
            </span>
            <p className="text-white font-extralight text-sm">
              Wind Speed:
              <span className="font-medium ml-1">{weatherData.speed} km/h</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center py-3 text-sm space-x-2">
        <div className="flex justify-center items-center">
          <UilSun size={20} className="text-white" />
          <p className="text-white text-sm ml-2">
            Rise:
            <span className="font-medium ml-1">{weatherData.sunrise}</span>
          </p>
        </div>
        <p className="text-white">|</p>
        <div className="flex justify-center items-center">
          <UilSunset size={20} className="text-white" />
          <p className="text-white text-sm ml-2">
            Set:<span className="font-medium ml-1">{weatherData.sunset}</span>
          </p>
        </div>
        <p className="text-white">|</p>
        <div className="flex justify-center items-center">
          <UilArrowUp size={20} className="text-white" />
          <p className="text-white text-sm ml-2">
            High:
            <span className="font-medium ml-1">
              {weatherData.temp_max?.toFixed(0)}°
            </span>
          </p>
        </div>
        <p className="text-white">|</p>
        <div className="flex justify-center items-center">
          <UilArrowDown size={20} className="text-white" />
          <p className="text-white text-sm ml-2">
            Low:
            <span className="font-medium ml-1">
              {weatherData.temp_min?.toFixed(0)}°
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TempratureAndDetails;
