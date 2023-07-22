import { DateTime } from "luxon";
import { toast } from "react-toastify";

const API_KEY = "4502af7a2505ef6c744d36f2c24c4e89";
const API_URL = `https://api.openweathermap.org/data/2.5/`;
const getWeatherData = async function (infoType, searchParams) {
  const url = new URL(API_URL + "/" + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: API_KEY,
  });
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === "404") throw Error(data.message);
    return data;
  } catch (err) {
    console.log(err);
    toast.error(`Error: ${err.message}`);
  }

  //It gives us the lat and lng of the city so we can use them in the forcast fetch
};

const getFormatedWeatherData = async function (searchParams) {
  const formattedCurrentAndForcastWeatherData = await getWeatherData(
    "weather",
    searchParams
  ).then(async (data) => {
    const currentWeather = formatCurrentWeather(data);
    const { lat, lon } = data.coord;
    const forcastWeather = await getWeatherForcast(
      lat,
      lon,
      searchParams.units
    );

    return { ...currentWeather, forcastWeather };
  });

  console.log(formattedCurrentAndForcastWeatherData);
  return formattedCurrentAndForcastWeatherData;
};

const formatCurrentWeather = function (data) {
  // if (data.cod === "404") return;
  const {
    coord: { lat, lon },
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt: formatToLocalTime(dt, "Egypt"),
    country,
    sunrise: formatToLocalTime(sunrise, "Egypt", "hh:mm: a"),
    sunset: formatToLocalTime(sunset, "Egypt", "hh:mm: a"),
    speed,
    details,
    icon,
  };
};
const formatToLocalTime = function (
  secs,
  zone,
  format = "cccc, dd LLL, yyyy | hh:mm: a"
) {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

const getWeatherForcast = async function (lat, lon, units) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );
  const data = await res.json();

  const filteredHours = data["list"].slice(0, 6);
  const filtedDays = data["list"].filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) => t.dt_txt.split(" ")[0] === value.dt_txt.split(" ")[0]
      )
  );
  const modifiedFilterdDays = filtedDays.map((day) => {
    return { ...day };
  });
  const modifiedFilterdHours = filteredHours.map((hour) => {
    return { ...hour };
  });
  const forcast = {
    hours: [...modifiedFilterdHours],
    days: [...modifiedFilterdDays],
  };
  return forcast;
};

export default getFormatedWeatherData;
