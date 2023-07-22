import React from "react";

function TimeAndLocation({ weatherData, query }) {
  return (
    <div className="flex flex-col justify-center items-center my-6">
      <p className="text-xl font-extralight text-white tracking-widest">
        {weatherData?.dt}
      </p>
      <h1 className="text-xl font-poppins font-medium  text-white my-3">
        {weatherData.name}, {weatherData?.country}
      </h1>
    </div>
  );
}

export default TimeAndLocation;
