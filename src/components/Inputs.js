import React, { useEffect, useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

function Inputs({ units, setQuery, setUnits }) {
  const [city, setCity] = useState("");

  function handelClick() {
    if (city !== "") setQuery({ q: city });
    setCity("");
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Enter") handelClick();
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [handelClick]
  );
  function handelLocation() {
    if (navigator.geolocation) {
      toast.info("featching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location featched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  }

  function handelChangeUnits(e) {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  }

  return (
    <div className="flex justify-center flex-row my-6">
      <div className="w-3/4 flex justify-center items-center space-x-4 ">
        <input
          value={city}
          type="text"
          placeholder="Search for city..."
          className="mx-1 w-full font-light text-xl focus:outline-none p-2 shadow-xl shadow-gray-800 capitalize placeholder:lowercase"
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <UilSearch
          size={25}
          className="text-white cursor-pointer trandition ease-out hover:scale-125"
          onClick={handelClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer trandition-ease-out hover:scale-125"
          onClick={handelLocation}
        />
      </div>
      <div className="w-1/4 flex justify-center items-center">
        <button
          name="metric"
          className="text-xl text-white font-light"
          onClick={handelChangeUnits}
        >
          °C
        </button>
        <p className="text-white text-xl mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light"
          onClick={handelChangeUnits}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
