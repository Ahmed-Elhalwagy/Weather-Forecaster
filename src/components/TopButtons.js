import React from "react";

const cities = [
  {
    id: 1,
    name: "London",
  },
  {
    id: 2,
    name: "Paris",
  },
  {
    id: 3,
    name: "Cairo",
  },
  {
    id: 4,
    name: "Manchester",
  },
  {
    id: 5,
    name: "Liverpool",
  },
];

function TopButtons({ setQuery }) {
  return (
    <div className="flex flex-wrap justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => setQuery({ q: city.name })}
          className="text-white text-lg font-medium"
        >
          {city.name}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
